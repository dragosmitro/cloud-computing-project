ACADEMIA DE STUDII ECONOMICE DIN BUCUREȘTI

FACULTATEA DE CIBERNETICĂ, STATISTICĂ ȘI INFORMATICĂ ECONOMICĂ
Program masterat: Sisteme informatice pentru managementul proceselor și resurselor economice

PROIECT
CLOUD COMPUTING
DEZVOLTAREA UNEI APLICAŢII WEB CE UTILIZEAZĂ 2 SERVICII ÎN CLOUD

Profesor Coordonator:
conf.univ.dr. TIMOFTE Carmen Manuela

Student:
Mitroescu Dragoş

Cuprins

1. Introducere
2. Descrierea problemei
3. Descriere API
4. Flux de date
5. Capturi de ecran aplicație
   5.1. Pagina Home cu știri exclusive
   5.2. Formular de trimitere invitație
   5.3. Acces restricționat pentru utilizatori neinvitați

6. Introducere
   Aplicația „Știri Exclusive” este o platformă web care oferă acces restricționat la conținut informațional, destinat exclusiv utilizatorilor invitați. Scopul principal al aplicației este de a simula un sistem de tip „members-only content”, în care doar persoanele care au fost invitate anterior de un utilizator existent pot accesa lista de știri.
   Această abordare adaugă o dimensiune de control al accesului, oferind o experiență limitată și personalizată. Accesul este gestionat printr-un mecanism simplu de autentificare (oferit de serviciul Clerk) și validare a adresei de email într-o bază de date stocată în cloud (Firestore). După autentificare și verificare, utilizatorul poate citi știri exclusive, iar la rândul său poate trimite invitații altor persoane.

- Video prezentare: https://youtu.be/7L7tmkNoNCU?si=PJJKeMjJoPNW1-TC

- Link publicare: https://cloud-computing-project-flax.vercel.app/

- Link repository: https://github.com/dragosmitro/cloud-computing-project

2.  Descrierea problemei
    Într-un context digital în care accesul la informație este larg deschis, există tot mai multe situații în care conținutul valoros sau sensibil trebuie distribuit într-un mod controlat. Fie că este vorba despre știri interne, materiale exclusive sau comunicări confidențiale, apare nevoia unei aplicații care să permită accesul doar persoanelor autorizate.
    Problema abordată în această aplicație este gestionarea controlată a accesului la conținut informațional, într-un mod simplu, dar sigur. Mai exact, doar utilizatorii care au fost invitați în prealabil (prin introducerea emailului lor în sistem) pot accesa articolele din aplicație.
    Provocarea constă în implementarea unui flux de autentificare, validare a emailului, stocare a datelor și oferirea unei interfețe clare pentru vizualizarea și extinderea rețelei de utilizatori — toate fără a utiliza un backend dedicat. Soluția propusă folosește doar servicii cloud gratuite și tehnologie frontend pentru a demonstra fezabilitatea unui astfel de sistem într-un mod ușor de scalat și gestionat.
3.  Descrierea problemei
    Aplicația expune două API routes construite cu Next.js (/app/api/) care interacționează cu baza de date Firebase Firestore:

- GET /api/news
  Returnează știrile disponibile doar dacă utilizatorul este autorizat (ex. invitat).
  Header necesar: email (adresa de email a utilizatorului curent)
- POST /api/invite
  Permite adăugarea unui nou utilizator în baza de date, pe baza unui email.
  Body:
  {
  "email": "exemplu@email.com"
  }

4. Flux de date
   Aplicația web funcționează pe baza unui flux de date simplu și clar, care implică autentificarea utilizatorilor și interacțiunea cu o bază de date Firebase Firestore prin intermediul unor API-uri construite în Next.js.
   După ce utilizatorul se autentifică prin platforma Clerk, acesta este redirecționat către pagina principală a aplicației, unde sunt afișate știrile disponibile. În acest moment, aplicația extrage adresa de email a utilizatorului autentificat și trimite o cerere de tip GET către endpoint-ul /api/news, trimițând emailul în header-ul requestului. Pe server, această cerere este preluată de o funcție care verifică dacă adresa de email a utilizatorului există în colecția users din Firestore. Dacă utilizatorul este invitat (deci există în baza de date), aplicația returnează lista de știri din colecția news, care este afișată în interfața aplicației. Dacă utilizatorul nu este prezent în baza de date, accesul la conținut este refuzat, iar aplicația afișează un mesaj corespunzător.
   În cazul în care un utilizator dorește să ofere acces altcuiva, poate accesa pagina /invite, unde introduce adresa de email a persoanei respective și trimite formularul. Această acțiune generează un request POST către endpoint-ul /api/invite, care conține emailul în corpul cererii. Pe server, dacă emailul nu există deja în colecția users, acesta este adăugat, oferind astfel acces persoanei invitate la funcționalitățile aplicației.
5. Capturi de ecran aplicație

Figura 5.1. Pagina Home cu știri exclusive
Figura 1 prezintă interfața principală a aplicației, disponibilă doar utilizatorilor invitați. Știrile sunt afișate într-un layout de tip grilă, fiecare card conținând titlul, conținutul și data publicării.

Figura 5.2. Formular de trimitere invitație
Figura 2 ilustrează formularul prin care un utilizator existent poate invita alți utilizatori introducând adresa de email. După trimiterea cu succes, adresa este salvată în colecția users, permițând astfel accesul viitor.

Figura 5.3. Acces restricționat pentru utilizatori neinvitați
Figura 3 arată mesajul afișat în cazul în care un utilizator se autentifică, dar nu a fost invitat în prealabil. Aplicația previne accesul neautorizat și oferă instrucțiuni clare pentru obținerea accesului.
