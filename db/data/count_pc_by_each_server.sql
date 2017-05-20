use customer;
select
	GRP.server,
    GRP.number_pcs,
    E.system_type,
    E.version
from 
(SELECT 
    server, 
    SUM(number_pc) as number_pcs
FROM
    kids K
WHERE
    server != ''
GROUP BY server) GRP
left join servers S on GRP.server = S.name
left join environments E on S.environment_id = E.id