INSERT INTO public."messageContents" (id, "text", "mediaUrl", "sentAt","createdAt", "updatedAt") VALUES (1, 'Welcome to Micro 🎉\n\nEvery day you will receive an SMS with a screenshot essay 💥\n\nFirst up, Sam Altman shares how to be successful\n\nSource: shorturl.at/grux5', 'https://dl.airtable.com/.attachments/73ce89f693833d71fe045d4b0240c09e/6978bcd7/sama-howtobesuccessful2.png', null, now(), now());

select ii."screenName", sum(et.points) from public."events" e join public."eventTypes" et on e."eventTypeId" = et.id join public."internetIdentities" ii on ii."userId" = e."userId" where ii."identityType" = 'TWITTER' group by 1 order by 2 desc, 1 asc;

select sum(et.points) from public."events" e join public."eventTypes" et on e."eventTypeId" = et.id;

select sum(et.points) from public."events" e join public."eventTypes" et on e."eventTypeId" = et.id where e."userId" = 3;