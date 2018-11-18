[![Build Status](https://travis-ci.org/Ndifreke/sendIt.svg?branch=develop)](https://travis-ci.org/Ndifreke/sendIt)
[![Maintainability](https://api.codeclimate.com/v1/badges/794eccb03132f5acde0b/maintainability)](https://codeclimate.com/github/Ndifreke/sendIt/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/794eccb03132f5acde0b/test_coverage)](https://codeclimate.com/github/Ndifreke/sendIt/test_coverage)

# SendIt
SendIT is a courier service that helps users deliver parcels to different destinations. SendIT
provides courier quotes based on weight categories.

## Build Project
```
git clone https://github.com/Ndifreke/sendIt.git
cd sendIt
npm install
```
#### Run Project
```
npm run start
```
#### Running the tests
```
npm test
```

## Public API End points
```
Fetch All Parcels    : GET : api/v1/parcels
Fetch one Parcel     : GET : api/v1/parcels/<parcel-id>
Fetch a users percel : GET : api/v1/users/<parce-id>/parcels
Cancel a Parcel      : PUT : api/v1/parcels/<parcel-id>
Create a Parcel      : POST: api/v1/parcels
```

## Built With

* [Express](https://expressjs.com/) - Node.js Largest community framework
* [Node.js® ](https://maven.apache.org/) - JavaScript runtime

## Authors

* **Ndifreke Ekim** -  - [Twitter](https://twitter.com/nexkim360)
