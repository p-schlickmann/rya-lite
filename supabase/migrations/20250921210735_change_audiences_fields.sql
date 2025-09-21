alter table "public"."audiences" drop column "age_group";

alter table "public"."audiences" drop column "budget";

alter table "public"."audiences" drop column "country";

alter table "public"."audiences" drop column "preferred_channels";

alter table "public"."audiences" add column "age_max" smallint;

alter table "public"."audiences" add column "age_min" smallint;

alter table "public"."audiences" add column "birth_sex" text;

alter table "public"."audiences" add column "city" text;

alter table "public"."audiences" add column "income" text;


