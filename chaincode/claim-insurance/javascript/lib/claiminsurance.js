'use strict';

const { Contract } = require('fabric-contract-api');

class ClaimInsurance extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const claims = [
            {
                PolicyHolder: 'Jenny David',
                PolicyNumber: '258761075',
                CarDetails: 
                    {
                        Make: 'Toyota',
                        Model: 'Rav4',
                        Year: '2020',
                        Registration: 'L4217199',
                        LicensePlateNUmber: 'CKLY538'
                    },
                AccidentDetails:
                    {
                        Date: '20190201'
                        Time: '1600'
                        Location: 'Toronto'
                        NumberOfPassengers: '1'
                        DescritionOfTheAccident: '...'
                    },
                Drivers: ["Driver1", "Driver2"],
                Driver1Details:
                    {
                        Name: 'Peter Santos'
                        LicenseNumber:'Q9955-48489-90330'
                        InsuranceCompany: 'Pembridge'
                        InsurancePolicyNumber: '258761075' 
                    },
                InvestigatingOfficer: ''
            }
        ];

        for (let i = 0; i < claims.length; i++) {
            claims[i].docType = 'claim';
            await ctx.stub.putState('CLAIM' + i, Buffer.from(JSON.stringify(claim[i])));
            console.info('Added <--> ', claim[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async checkClaimInfo(ctx, claimNumber) {
        const claimAsBytes = await ctx.stub.getState(claimNumber); // get the claim info from chaincode state
        if (!claimAsBytes || claimAsBytes.length === 0) {
            throw new Error(`${claimNumber} does not exist`);
        }
        console.log(claimAsBytes.toString());
        return claimAsBytes.toString();
    }

    async fillClaimForm(ctx, claimNumber, make, model, color, owner) {
        console.info('============= START : Generate Claim Report ===========');

        const claim = {
            color,
            docType: 'claim',
            make,
            model,
            owner,
        };

        await ctx.stub.putState(claimNumber, Buffer.from(JSON.stringify(claim)));
        console.info('============= END : Generate Claim Report ===========');
    }

    async queryAllCars(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeCarOwner(ctx, carNumber, newOwner) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.owner = newOwner;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }

}

module.exports = ClaimInsurance;
