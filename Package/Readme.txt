How to create initial migration?
Install-Package Microsoft.EntityFrameworkCore.Tools
Install-Package Microsoft.EntityFrameworkCore.Design

Run PM command
Add-Migration InitialCreate
Update-Database


Run PM Command (Identity User)
Add-Migration IdentiyAdded
Update-Database