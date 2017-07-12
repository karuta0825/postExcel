use customer;
SELECT 
    GRP.server,
    GRP.pc_number,
    S.capacity - GRP.pc_number AS available_number,
    S.version
FROM
    (SELECT 
        server, SUM(number_pc) AS pc_number
    FROM
        kids K
    WHERE
        server != ''
    GROUP BY server) GRP
        LEFT JOIN
    servers S ON GRP.server = S.name 
UNION SELECT 
    type, 
    pc_number,
    capacity - pc_number,
    WEB.version
FROM
    (SELECT 
        type, version, capacity
    FROM
        customer.servers
    WHERE
        type = 'WEB') WEB
        LEFT JOIN
    (SELECT 
        SUM(number_pc) AS pc_number, version
    FROM
        kids K
    RIGHT JOIN servers S ON S.name = K.server
    GROUP BY version) GRP ON WEB.version = GRP.version;