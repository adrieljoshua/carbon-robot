System Flow:

Initial Setup:

Copya. Deploy CarbonToken contract
b. Deploy CompanyRegistry contract
c. Deploy DeviceRegistry contract
d. Deploy EmissionReporting contract

Company Registration:

Copya. Company calls register_company() on CompanyRegistry
b. Gets assigned initial eco_score and token requirements
c. Must acquire minimum required tokens

Device Registration:

Copya. Company registers their drones/sensors through register_device()
b. Each device gets a public/private key pair
c. Devices must be active to submit reports

Emission Measurement Process:

Copya. AI agent determines optimal flight path
b. update_flight_path() sets drone route
c. Drone follows path and collects data
d. Data is signed with device's private key

Emission Reporting:

Copya. Device submits report through submit_report()
b. Contract verifies device signature
c. Updates emission data in CompanyRegistry
d. Mints/burns tokens based on emissions:

- Higher emissions -> Must acquire more tokens
- Lower emissions -> Can sell excess tokens

Ongoing Operations:

Copya. Companies can trade tokens through transfer()
b. AI updates eco_scores based on compliance
c. Companies must maintain minimum token balance
d. Regular emission reports update requirements
