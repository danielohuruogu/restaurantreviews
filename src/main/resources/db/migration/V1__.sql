alter table site_user drop COLUMN role;

alter table site_user add COLUMN role INTEGER NOT NULL;