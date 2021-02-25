# Car Accident Insurance Claim #

## State Transition Diagram ##
 ![state diagram](https://github.com/elaquiambao/GBC-dApp1-CarAccidentInsuranceClaim/blob/main/images/car-insurance-claim.jpg?raw=true)

## State Data ##
```
States: [“No Claim”, “Claim Form Filled-out”, “Claim Under Evaluation”, “Received Claim”]
State: 0
Claim Number: “”
Policy Holder: “”
Policy Number: “”
Car Details: {
	Make: “”,
	Model: “”,
	Year: “”,
	Registration: “”,
 License Plate Number: “” 
	}
Accident Details: {
	Date: “”,
	Time: “”,
	Location: “”,
	Extent of any injuries: “”,
	Number of passengers involved: “”,
	Extent of damage to the vehicle: “”,
	Description of the accident: “”,
 Drivers: [“Driver 1”, “Driver 2”, .. Driver n”],
 Driver Details: {
   Name: “”,
   License Number: “”,
   Insurance Company: “”,
   Insurance Policy Number: “” 
  }
 }
Investigating Officer: “”
 ```



## Transition Functions and Roles ##

Transition/Function | Role
------------------- | ----
FillClaimForm (ClaimNumber) | Policy Holder
SubmitClaim(ClaimNumber) | Broker/Agent/Insurance Company
Incomplete(ClaimNumber) | System/Claims Adjuster
Disapproved(ClaimNumber) | System
Approved(ClaimNumber, AmountClaimed) | System
CheckClaimInfo(ClaimNumber) | Policy Holder, Insurance Comapany, Police
CheckStatus(ClaimNumber) | Policy Holder, Insurance Company


### Student Information

Name:       | Elanie Quiambao 
------------|------------
Student Id: | 101339344

