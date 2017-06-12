use customer;
select
	GRP.server,
    GRP.pc_number,
    80 - GRP.pc_number as available_number,
    S.version
from 
(SELECT 
    server, 
    SUM(number_pc) as pc_number
FROM
    kids K
WHERE
    server != ''
GROUP BY server) GRP
left join servers S on GRP.server = S.name
order by server;