[![Build Status](https://travis-ci.org/Ndifreke/sendIt.svg?branch=develop)](https://travis-ci.org/Ndifreke/sendIt)
[![Maintainability](https://api.codeclimate.com/v1/badges/794eccb03132f5acde0b/maintainability)](https://codeclimate.com/github/Ndifreke/sendIt/maintainability)


# SendIt
SendIT is a courier service that helps users deliver parcels to different destinations. SendIT
provides courier quotes based on weight categories.

### Run Project
```
git clone https://github.com/Ndifreke/sendIt.git
cd into sendIt
Install Dependencies: npm install
start Application: npm run start
```
## Running the tests
git clone https://github.com/Ndifreke/sendIt.git
cd into sendIt
Install Dependencies: npm install
Run: npm test

## Public API End points
Fetch All Parcels    : GET : api/v1/parcels
Fetch one Parcel     : GET : api/v1/parcels/<parcel-id>
Fetch a users percel : GET : api/v1/users/<parce-id>/parcels
Cancel a Parcel      : PUT : api/v1/parcels/<parcel-id>
Create a Parcel      : POST: api/v1/parcels


## Built With

* [Express](https://expressjs.com/) - Node.js Largest community framework
* [Node.js® ](https://maven.apache.org/) - JavaScript runtime

## Authors

* **Ndifreke Ekim** -  - [Twitter](https://twitter.com/nexkim360)