# Create the Azure VM that acts as docker host

try {
    Write-host "`r`nSet creation values`r`n"
    $_vmName =          "haufe-techradar-vm"
    $_dns =             "haufe-techradar"
    $_subscriptionId =  "<your subscription id>"  # use SWDArchitects subscription Id for Haufe internal usage
    $_rgName =          "techradar-rg"
    $_location =        "westeurope"
    $_vnet =            "techradar-vnet"
    $_subnet =          "techradar-subnet"
    $_availabilityset = "techradar-as"
    $_vmSize =          "Standard_D1"
    
    Write-host "Do Login"
    # interactive Login - automatic login will be done at a later point in time
    Login-AzureRmAccount
    
    Select-AzureRmSubscription -SubscriptionId $_subsId

    Write-Output "`r`nCreating VM $_vmName for dns = $_dns with docker-machine...`r`n" 
  
    if ([string]::IsNullOrEmpty($_azureUser)) {
	    docker-machine create -d azure --azure-location="$($_location)" --azure-size="$($_vmSize)" `
        --azure-vnet="$($_vnet)" `
        --azure-resource-group="$($_rgName)" `
        --azure-subnet="$($_subnet)" `
        --azure-availability-set="$($_availabilityset)" `
        --azure-subscription-id="$($_subscriptionId)" `
        --azure-dns="$($_dns)" `
        --azure-image="canonical:UbuntuServer:16.04.0-LTS:latest" `
        --azure-open-port="443" `
        --azure-open-port="1443" `
        --azure-open-port="2443" `
        --azure-open-port="80" `
        --azure-open-port="5000" `
        $_vmName
    } else {
	docker-machine create -d azure --azure-location="$($_location)" --azure-size="$($_vmSize)" `
        --azure-vnet="$($_vnet)" `
        --azure-resource-group="$($_rgName)" `
        --azure-subnet="$($_subnet)" `
        --azure-availability-set="$($_availabilityset)" `
        --azure-subscription-id="$($_subscriptionId)" `
        --azure-dns="$($_dns)" `
        --azure-image="canonical:UbuntuServer:16.04.0-LTS:latest" `
        --azure-open-port="443" `
        --azure-open-port="1443" `
        --azure-open-port="2443" `
        --azure-open-port="80" `
        --azure-open-port="5000" `
        --azure-client-id $_azureUser `
        --azure-client-secret $_azureSecret `
        $_vmName
     }

    # Check result
    if ($lastexitcode -ne 0) {
        throw ("exception: '$errorMessage' code '$lastexitcode'")
    } else {
		Write-host "check VM..."
		if (!(Get-AzureRmVM -ResourceGroupName $_rgName -Name $_vmName -ErrorAction SilentlyContinue)) {
			throw ("vm not found")
		}
		else {
			Write-host "$_vmName created"
		}
    }
} catch {	
	Write-Host "Failed on docker-machine" 
	Write-Host "Error:" $_.Exception.Message
	Write-Host "Item:" $_.Exception.ItemName
	exit -1
}
