drop policy "Enable users to manage their own audiences only" on "public"."audiences";

drop policy "Enable users to manage their concepts on" on "public"."concepts";

create policy "Enable users to manage their own audiences only"
on "public"."audiences"
as permissive
for all
to authenticated
using ((user_id = ( SELECT auth.uid() AS uid)))
with check ((user_id = ( SELECT auth.uid() AS uid)));


create policy "Enable users to manage their concepts on"
on "public"."concepts"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM "public"."audiences" a
  WHERE ((a.id = concepts.audience_id) AND (a.user_id = ( SELECT auth.uid() AS uid))))))
with check ((EXISTS ( SELECT 1
   FROM "public"."audiences" a
  WHERE ((a.id = concepts.audience_id) AND (a.user_id = ( SELECT auth.uid() AS uid))))));



