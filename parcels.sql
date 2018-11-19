CREATE TABLE parcels(
id SERIAL,
owner INT REFERENCES users(id) ON DELETE RESTRICT,
shortname VARCHAR(50) NOT NULL,
destination TEXT NOT NULL,
destination_Lat  TEXT ,
destination_lng TEXT ,
origin TEXT NOT NULL,
origin_Lat TEXT ,
origin_lng TEXT ,
description TEXT,
distance NUMERIC NOT NULL,
status INT DEFAULT 1,
weight NUMERIC NOT NULL,
created_At DATE DEFAULT current_date,
delivered_On DATE ,
location TEXT DEFAULT 'WAREHOUSE',
price NUMERIC NOT NULL
);

INSERT INTO parcels(
owner,
destination,
destination_lat,
destination_lng,
origin,
origin_lat,
origin_lng,
distance,
weight,
price,
shortname,
description
)VALUES(
1,
'Amule',
'0.25468',
'0215',
'Lagos',
'569565',
'54445887',
25,
50,
35,
'Bag or rice and beans',
'warehouse'
);

