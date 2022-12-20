CREATE TABLE "tasks" (
	"id" serial primary key,
	"task" varchar(80) not null,
	"priority" integer,
	"is_completed" varchar(10) not null 
);
