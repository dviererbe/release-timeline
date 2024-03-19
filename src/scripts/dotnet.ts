export class ReleaseChannel
{
    public readonly Major: number
    public readonly Minor: number
    public readonly Support: SupportInfo
    public readonly Releases: Release[]

    constructor(options: {
        major: number,
        minor: number, 
        support: SupportInfo,
        releases: Release[] })
    {
        this.Major = options.major;
        this.Minor = options.minor;
        this.Support = options.support;
    }
}

export class SupportInfo
{
    public readonly Type: SupportType
    public readonly EndOfLife: Date

    constructor(options: { type: SupportType, endOfLife: Date })
    {
        this.Type = options.type;
        this.EndOfLife = options.endOfLife;
    }
}

export enum SupportType
{
    LongTermSupport = "LTS",
    StandardTermSupport = "STS"
}

export class Release
{
    public readonly Date: Date
    public readonly RuntimeRelease: RuntimeRelease | null
    public readonly SdkReleases: SdkRelease[]
    public readonly Notes: URL | null

    constructor(options: {
        date: Date, 
        runtimeRelease?: RuntimeRelease, 
        sdkReleases?: SdkRelease[] | SdkRelease, 
        notes?: URL })
    {
        this.Date = options.date;
        this.RuntimeRelease = options.runtimeRelease ?? null;
        this.Notes = options.notes ?? null;
        
        if (Array.isArray(options.sdkReleases))
            this.SdkReleases = options.sdkReleases;
        else if (options.sdkReleases instanceof SdkRelease)
            this.SdkReleases = [ options.sdkReleases ];
        else
            this.SdkReleases = [];
    }

    public get HasReleaseNotes(): boolean
    {
        return this.Notes !== null;
    }

    public get IncludesRuntimeRelease(): boolean
    {
        return this.RuntimeRelease !== null;
    }

    public get IncludesSdkRelease(): boolean
    {
        return this.SdkReleases.length > 0;
    }
}

export type PreReleaseVersionLabel = string;

export class RuntimeRelease
{
    public readonly Patch: number
    public readonly PreReleaseVersionLabel: PreReleaseVersionLabel | null
    public readonly Notes: URL | null

    constructor(options: { 
        patch: number,
        preReleaseVersionLabel?: PreReleaseVersionLabel,
        notes?: URL })
    {
        this.Patch = options.patch;
        this.PreReleaseVersionLabel = options.preReleaseVersionLabel ?? null;
        this.Notes = options.notes ?? null;
    }

    public get HasPreReleaseVersionLabel(): boolean
    {
        return this.PreReleaseVersionLabel !== null;
    }

    public get HasReleaseNotes(): boolean
    {
        return this.Notes !== null;
    }
}

export class SdkRelease
{
    public readonly FeatureBand: number
    public readonly Patch: number
    public readonly PreReleaseVersionLabel?: string
    public readonly Notes: URL | null

    constructor(options: {
        featureBand: number,
        patch: number,
        preReleaseVersionLabel?: PreReleaseVersionLabel,
        notes?: URL })
    {
        this.Patch = options.patch;
        this.PreReleaseVersionLabel = options.preReleaseVersionLabel ?? null;
        this.Notes = options.notes ?? null;
    }

    public get HasPreReleaseVersionLabel(): boolean
    {
        return this.PreReleaseVersionLabel !== null;
    }

    public get HasReleaseNotes(): boolean
    {
        return this.Notes !== null;
    }
}

export const DotnetReleaseChannels: ReleaseChannel[] = 
[
    new ReleaseChannel({
        major: 8,
        minor: 0,
        support: new SupportInfo({
            type: SupportType.LongTermSupport,
            endOfLife: new Date(2026, 11, 10) 
        }),
        releases: [
            new Release({
                date: new Date(2023, 11, 14),
                runtimeRelease: new RuntimeRelease({ patch: 0 }),
                sdkReleases: [ new SdkRelease({ featureBand: 100, patch: 0 }) ]
            })
        ]
    }),
];

export default DotnetReleaseChannels;

