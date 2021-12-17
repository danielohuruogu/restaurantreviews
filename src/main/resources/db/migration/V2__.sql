alter table site_user drop COLUMN role;

alter table site_user add role INTEGER NOT NULL;