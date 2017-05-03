USE CUSTOMER;
SELECT U.service_id, S.service_name, U.is_used FROM ( 
SELECT 'K1' AS service_id, K1 AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'A1' AS service_id, A1 AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'U2' AS service_id, U2 AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'U3' AS service_id, U3 AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'U4' AS service_id, U4 AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'U5' AS service_id, U5 AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'U6' AS service_id, U6 AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'U7' AS service_id, U7 AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'U8' AS service_id, U8 AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'U9' AS service_id, U9 AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'UA' AS service_id, UA AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'UB' AS service_id, UB AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'UC' AS service_id, UC AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'UD' AS service_id, UD AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'UE' AS service_id, UE AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'UF' AS service_id, UF AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'UG' AS service_id, UG AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'UH' AS service_id, UH AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'UI' AS service_id, UI AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'C1' AS service_id, C1 AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'C2' AS service_id, C2 AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'C3' AS service_id, C3 AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'C4' AS service_id, C4 AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'S2' AS service_id, S2 AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'S3' AS service_id, S3 AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'S9' AS service_id, S9 AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'SC' AS service_id, SC AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'SE' AS service_id, SE AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'SH' AS service_id, SH AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'SI' AS service_id, SI AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'SJ' AS service_id, SJ AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'SL' AS service_id, SL AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'SM' AS service_id, SM AS is_used FROM licenses WHERE kid = 'KID77891'
UNION ALL
SELECT 'SO' AS service_id, SO AS is_used FROM licenses WHERE kid = 'KID77891'
) U LEFT JOIN services S ON U.service_id = S.service_id
