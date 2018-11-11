let db = require( "./Database" ).db;

class Parcel {

    constructor( option ) {
        this.name = option.name;
        this.destination = option.destination;
        this.destinatiionLatitude = option.destinationLatitude;
        this.destinationLongitude = option.destinationLongitude;
        this.description = option.description;
        this.origin = option.origin;
        this.originLatitude = option.originLatitude;
        this.originLongitude = option.originLongitude;
        this.createdAt = new Date().toDateString();
        this.user = option.user;
    }

    /* Create a new Parcel and save it to the database */
    create() {
        const parcel = {
            userId: this.user,
            parcel: {
                name: this.name,
                destination: this.destination,
                destinationLatitude: this.destinatiionLatitude,
                destinationLongitude: this.destinationLongitude,
                origin: this.origin,
                originLatitude: this.originLatitude,
                originLongitude: this.originLongitude,
                status: Parcel.PENDING,
                description: this.description,
                createdAt: this.createdAt
            }
        }
      let  id = parseInt( Parcel.getDB().lastId ) + 1;
        Parcel.add( id, parcel );
    }

    /* Add a new Parcel to parcel database */
    static add( id, parcel ) {
        let isSaved = true;
        try {
            let database = this.getDB();
            database.parcelList[ id ] = parcel;
            this.save( database );
        } catch ( e ) {
            //Something happened which prevented saving this parcel
            isSaved = false;
        } finally {
            if ( isSaved ) {
                let db = Parcel.getDB();
                db.lastId = parseInt( db.lastId ) + 1;
                this.save( db );
                return true;
            }
            return false;
        }
    }

    /*  fetch parcels by it id */
    static fetchById( parcelId ) {
        parcelId = parcelId.toString();
        const result = {
            status: "error",
            items: {}
        }
        let database = Parcel.getDB();
        if ( parcelId in database.parcelList ) {
            result.status = "ok";
            let item = database.parcelList[ parcelId ];
            result.items[ parcelId ] = item;
            return JSON.stringify( result, null, "\t" );
        }
        return JSON.stringify( result );
    }

    static getDB() {
        return db.readDb( Parcel.path );
    }

    /* fetch parcels owned by user Identified by userId */
    static fetchByUserId( userId ) {
        userId = userId.toString();
        const result = {
            status: "error",
            items: {}
        }
        let database = Parcel.getDB();
        let parcelList = database.parcelList;
        for ( let parcelId in parcelList ) {
            if ( userId == parcelList[ parcelId ].userId ) {
                result.status = "ok";
                result.items[ parcelId ] = parcelList[ parcelId ];
                continue;
            }
        }
        /* No result was found*/
        return JSON.stringify( result, null, "\t" );
    }

    static changeStatus( parcelId, status ) {
        switch ( status ) {
            //fall throw any of the known statuses
            case Parcel.CANCELLED:
            case Parcel.DELIVERED:
            case Parcel.PENDING:
            case Parcel.SHIPPED:
                return Parcel.update( parcelId, "status", status );
        }
        return false;
    }

    static changeDestination( parcelId, options ) {
        let isUpdated = false;
        if ( options ) {
            if ( options.destination ) {
                isUpdated = Parcel.update( parcelId, "destination", options.destination );
            }
            if ( options.destinationLatitude ) {
                isUpdated = Parcel.update( parcelId, "destinationLatitude", options.destinationLatitude );
            }
            if ( options.destinationLongitude ) {
                isUpdated = Parcel.update( parcelId, "destinationLongitude", options.destinationLongitude );
            }
        }
        return isUpdated;
    }

    /* Write file back to the this Parcels database */
    static save( data ) {
        db.writeToDb( JSON.stringify( data, null, "\t" ), Parcel.path );
    }

    /* Update any fields of a parcel Identified by ID */
    static update( parcelId, fieldName, value ) {
        let result = JSON.parse( Parcel.fetchById( parcelId ) );
        if ( result.status !== "error" ) {
            let itemUpdate = result.items[ parcelId ];

            if ( fieldName in itemUpdate.parcel ) {
                itemUpdate.parcel[ fieldName ] = value; //what to change
                let database = Parcel.getDB();
                database.parcelList[ parcelId ] = itemUpdate;
                Parcel.save( database );
                return true;
            }
            return false;
        }
        return false;
    }


}
Parcel.path = __dirname + "/database/parcel.json";
Parcel.PENDING = "PENDING";
Parcel.DELIVERED = "DELIVERED";
Parcel.SHIPPED = "SHIPPED";
Parcel.CANCELLED = "CANCELLED";
module.exports.Parcel = Parcel;
module.exports.path = Parcel.path;

