drop table if exists Pet_Table;
drop table if exists User_Table;

create table User_Table(
	wechatID varchar(50) primary key
);

create table Pet_Table(
	petID int primary key auto_increment not null,
    petName varchar(50),
    petAge int unsigned default 0,
    petWeight int unsigned default 0,
    petExercise int unsigned default 0,
    petUrl int unsigned not null,
    isReturned bool default false,
    petOwner varchar(50) not null
);

alter table Pet_table 
add constraint foreign key
(petOwner) references
User_table(wechatID);


drop view if exists Pet_View;

create view Pet_View as
	select petName, petAge, petWeight, petExercise, petUrl 
	from Pet_Table 
    inner join User_Table 
    on wechatID = petOwner 
	where isReturned = false;

drop procedure if exists read_pet_procedure;
delimiter $$
create procedure read_pet_procedure (in wID varchar(50))
begin
	select petName, petAge, petWeight, petExercise, petUrl 
	from Pet_Table 
    inner join User_Table 
    on wechatID = petOwner
	where isReturned = false and petOwner = wID;
end
$$
delimiter ;

