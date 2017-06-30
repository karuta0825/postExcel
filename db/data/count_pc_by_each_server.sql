use customer;
select
	GRP.server,
    GRP.pc_number,
    80 - GRP.pc_number as available_number,
    S.version
from 
(SELECT 
    K.server, 
    count(CLI.kid) as pc_number
FROM
    clients CLI
left join kids K 
on CLI.kid = K.kid
WHERE
    CLI.is_admin = 0
GROUP BY server) GRP
left join servers S on GRP.server = S.name
order by server;