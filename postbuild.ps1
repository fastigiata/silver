# usage: postbuild.ps1 -outdir <path>
# description: Writes build info to a file in the specified directory.
#              The file is named 'buildinfo' and contains the git hash and
#              the build time.
#              The file is written only if the 'outdir' parameter is set and
#              the directory exists.

param (
    [string]$outdir
)

if ( $PSBoundParameters.ContainsKey("outdir"))
{
    if (Test-Path -Path $outdir -PathType Container)
    {
        $dest = Join-Path -Path $outdir -ChildPath "buildinfo"
        $buildtime = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        $hash = git rev-parse --short HEAD

        Write-Output "Build ($( $hash )) $( $buildtime )" | Out-File -Encoding utf8 -FilePath $dest
        Write-Output "Success: Build info written to $( $dest )"
    }
    else
    {
        Write-Output "Error: 'outdir' does not exist or is not a directory!"
    }
}
else
{
    Write-Output "Error: 'outdir' is not set!"
}
