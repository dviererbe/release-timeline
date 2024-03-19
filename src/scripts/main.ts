// Import our custom CSS
import '../styles/main.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import { DataSet } from 'vis-data/esnext'
import { Timeline, TimelineOptions } from 'vis-timeline/esnext';
import { DotnetReleaseChannels } from './dotnet';
import * as DotnetReleaseData from './dotnet-release-data.json'
import * as UbuntuReleaseData from './ubuntu-release-data.json'

const groups = new DataSet(
    [
        { id: "ubuntu", content: "Ubuntu" },
        { id: "dotnet", content: ".NET" }
    ]);

const items = [];

UbuntuReleaseData.releases.forEach(release => {
    const name = `Ubuntu ${release.version}${ release.lts ? " LTS" : "" } (${release.codename})`
    const finalRelease = release.release.schedule.events.find(e => e.type === "Final Release")!;
    const endOfStandardSupport = release.release.schedule.events.find(e => e.type === "End of Standard Support")!;
    const endOfExpandedSecurityMaintenance = release.release.schedule.events.find(e => e.type === "End of Expanded Security Maintenance");

    items.push(
    { 
        id: `ubuntu-${release.version}-standard-support`, 
        group: "ubuntu", 
        content: name + " \u2013 Standard Support", 
        start: finalRelease.date, 
        end: endOfStandardSupport.date, 
        type: "range" 
    });

    if (endOfExpandedSecurityMaintenance)
    {
        items.push(
        { 
            id: `ubuntu-${release.version}-esm`, 
            group: "ubuntu", 
            content:  name + " \u2013 Expanded Security Maintenance (ESM)", 
            start: finalRelease.date, 
            end: endOfExpandedSecurityMaintenance.date, 
            type: "range" 
        });
    }
});

DotnetReleaseData.channels.forEach((channel) => {
    items.push({ id: `${channel.major}-${channel.minor}-support`, group: "dotnet", content: `.NET ${channel.major}.${channel.minor} Lifetime`, start: channel.releases[0].date, end: channel.support.endOfLife, type: "range" });
    
    channel.releases.forEach(release => {
        let name = "";
        
        if (release.runtime != undefined)
        {
            name += `${channel.major}.${channel.minor}.${release.runtime.patch}`;
        }
        
        release.sdks.forEach(sdk => {
            if (name !== "") { name += ", "; }
            
            name += `${channel.major}.${channel.minor}.${sdk.featureBand + sdk.patch}`
        })

        items.push({ id: `${channel.major}-${channel.minor}-${release.date}`, group: "dotnet", content: name, start: release.date, type: "point" });
    });
});

const options: TimelineOptions = {
    };

const container = document.getElementById('timeline')!;

const timeline = new Timeline(container, new DataSet(items), groups, options);
