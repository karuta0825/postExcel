select * from customer.fenics order by fenics_ip;

INSERT INTO customer.ips (ip) VALUES(INET_ATON('172.20.255.254'));

select INET_ATON('172.20.255.254');

select id, ip, INET_NTOA(ip) from customer.ips;

select ip,INET_NTOA(ip),case SUBSTRING_INDEX(INET_NTOA(ip), '.', -1) when 254 
then INET_NTOA(ip+3)
else INET_NTOA(ip+1)
end as next_ip
from ips order by ip desc;

select case SUBSTRING_INDEX(INET_NTOA(ip), '.', -1) when 254 
then INET_NTOA(ip+3)
else INET_NTOA(ip+1)
end as next_ip
from ips order by ip desc limit 1;
