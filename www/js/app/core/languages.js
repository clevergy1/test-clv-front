(function ($) {
    $.languages = (function (my) {

        var it = [];
        var en = [];

        //IT
        //=========================================================
        it['add'] = 'Nuovo';
        it['addF'] = 'Nuova';
        it['edit'] = 'Modifica';
        it['delete'] = 'Cancella';
        it['deleted'] = 'Cancellato';
        it['read'] = 'Leggi';
        it['save'] = 'Salva';
        it['retype'] = 'Ridigitare';
        it['close'] = 'Chiudi';
        it['clear'] = 'Pulisci';
        it['confirmdelete'] = 'Conferma cancellazione';
        it['detail'] = 'Dettaglio';
        it['description'] = 'Descrizione';
        it['search'] = 'Ricerca';
        it['status'] = 'Stato';
        it['map'] = 'Mappa';
        it['list'] = 'Elenco';
        it['prev'] = 'Prec';
        it['next'] = 'Succ';
        it['select'] = 'Scelta';
        it['manage'] = 'Gestione';
        it['alert'] = 'Attenzione';
        it['language'] = 'Lingua';
        it['yes'] = 'Si';
        it['no'] = 'No';
        it['lastupdate'] = 'Ultimo aggiornamento';
        it['lastupdateshort'] = 'Ult. agg.';
        it['latitude'] = 'Latitudine';
        it['longitude'] = 'Longitudine';
        it['altitude'] = 'Altitudine';       
        it['year'] = 'Anno';
        it['years'] = 'Anni';
        it['month'] = 'Mese';
        it['months'] = 'Mesi';
        it['day'] = 'Giorno';
        it['days'] = 'Giorni';
        it['hour'] = 'Ora';
        it['hours'] = 'Ore';
        it['minute'] = 'Minuto';
        it['minutes'] = 'Minuti';
        it['second'] = 'Secondo';
        it['seconds'] = 'Secondi';
        it['millisecond'] = 'Millisecondo';
        it['milliseconds'] = 'Millisecondi';
        it['qta'] = 'Quantità';
        it['code'] = 'Codice';
        it['document'] = 'Documento';
        it['documents'] = 'Documenti';
        it['size'] = 'Dimensione';
        it['daterange'] = 'Intervallo';
        it['portnumber'] = 'Porta';
        it['type'] = 'Tipo';
        it['starttime'] = 'orario di inizio';        

        it['signin'] = 'Accedi';
        it['rememberme'] = 'Rimani connesso';
        it['logasoperator'] = 'Accesso come operatore';
        it['logassupervisor'] = 'Accesso come supervisore';
        it['operatorlogin'] = 'Accesso operatore';
        it['supervisorlogin'] = 'Accesso supervisore';

        it['dashboard'] = 'Cruscotto';
        it['role'] = 'Ruolo';
        it['roles'] = 'Ruoli';
        it['users'] = 'Utenti';
        it['user'] = 'Ttente';
        it['endusers'] = 'Utenti finali';
        it['enduser'] = 'Utente finali';
        it['clients'] = 'Proprietari';
        it['client'] = 'Proprietario';
        it['mantainers'] = 'Manutentori';
        it['mantainer'] = 'Manutentore';
        it['availabeusers'] = 'Utenti disponibili';
        it['assignedusers'] = 'Utenti assegnati';
        it['ismaster'] = 'Capogruppo';
        it['administration'] = 'Amministrazione';
        it['navigation'] = 'Menu';
        it['cpuusage'] = 'tempo processore';
        it['batchrequest'] = 'richieste batch';
        it['currentjobs'] = 'processi';
        it['approved'] = 'approvati';
        it['notapproved'] = 'non approvati';
        it['locked'] = 'bloccati';
        it['enabled'] = 'abilitati';
        it['waittime'] = 'tempo di attesa';
        it['hostname'] = 'nome host';
        it['userslist'] = 'Elenco Utenti';
        it['select_a_role'] = 'Selezionare un ruolo';
        it['adduser'] = 'Nuovo utente';
        it['userdetail'] = 'Dettaglio utente';
        it['username'] = 'Nome utente';
        it['usercomment'] = 'Descrizione';
        it['usercreation'] = 'Creazione';
        it['userlastlogin'] = 'Ultimo accesso';
        it['userisenabled'] = 'Abilitato';
        it['userisdisabled'] = 'Non abilitato';
        it['userislocked'] = 'Bloccato';
        it['userisunlocked'] = 'Non bloccato';
        it['deleteuser'] = 'Cancellazione utente';
        it['msgconfirmuserdelete'] = 'Confermare la cancellazione per utente';
        it['msgoperationirreversible'] = 'Questa operazione è irreversibile';
        it['adduser'] = 'Nuovo utente';
        it['updateuser'] = 'Modifica utente';
        it['resetuserpassword'] = 'Modifica password utente';
        it['oldpassword'] = 'Vecchia password';
        it['newpassword'] = 'Nuova password';
        it['addressbook'] = 'Rubrica';
        it['name'] = 'Nome';

        it['address'] = 'Indirizzo';
        it['setaddress'] = 'Imposta indirizzo';
        
        it['project'] = 'Progetto';
        it['projects'] = 'Progetti';
        it['editproject'] = 'Modifica progetto';
        it['currentprojects'] = 'Progetti';
        it['availableprojects'] = 'Progetti disponibili';
        it['assignedprojecs'] = 'Progetti assegnate';
        it['userprojects'] = 'Progetti utente';

        it['installation'] = 'Installazione';
        it['installations'] = 'Installazioni';
        it['currentinstallations'] = 'Installazioni attuali';

        
        //=========================================================

        //EN
        //=========================================================
        en['add'] = 'Add';
        en['addF'] = 'Add';
        en['edit'] = 'Edit';
        en['delete'] = 'Delete';
        en['deleted'] = 'Deleted';
        en['read'] = 'Read';
        en['save'] = 'Save';
        en['retype'] = 'Retype';
        en['close'] = 'Close';
        en['clear'] = 'Clear';
        en['confirmdelete'] = 'Confirm delete';
        en['detail'] = 'Detail';
        en['description'] = 'Description';
        en['search'] = 'Search';
        en['status'] = 'Status';
        en['map'] = 'Map';
        en['list'] = 'List';
        en['prev'] = 'Prev';
        en['next'] = 'Next';
        en['select'] = 'Select';
        en['manage'] = 'Manage';
        en['alert'] = 'Alert';
        en['portnumber'] = 'Port';
        en['type'] = 'Type';
        en['starttime'] = 'start time';
        en['language'] = 'Language';
        en['yes'] = 'Yes';
        en['no'] = 'No';
        en['lastupdate'] = 'Last modified';
        en['lastupdateshort'] = 'Modified';
        en['latitude'] = 'Latitude';
        en['longitude'] = 'Longitude';
        en['altitude'] = 'Altitude';
        en['year'] = 'Year';
        en['years'] = 'Yars';
        en['month'] = 'Month';
        en['months'] = 'Months';
        en['day'] = 'Day';
        en['days'] = 'Days';
        en['hour'] = 'Hour';
        en['hours'] = 'Hours';
        en['minute'] = 'Minute';
        en['minutes'] = 'Minutes';
        en['second'] = 'Second';
        en['seconds'] = 'Seconds';
        en['millisecond'] = 'Millisecond';
        en['milliseconds'] = 'Milliseconds';
        en['qta'] = 'Quantity';
        en['code'] = 'Code';
        en['document'] = 'Document';
        en['documents'] = 'Documents';
        en['size'] = 'Size';
        en['daterange'] = 'Date range';

        en['signin'] = 'Sign in';
        en['rememberme'] = 'Remember me';
        en['logasoperator'] = 'Log as operator';
        en['logassupervisor'] = 'Log as supervisor';
        en['operatorlogin'] = 'Operator Login';
        en['supervisorlogin'] = 'Supervisor Login';

        en['dashboard'] = 'Dashboard';
        en['role'] = 'Role';
        en['roles'] = 'Roles';
        en['users'] = 'Users';
        en['user'] = 'User';
        en['endusers'] = 'End users';
        en['enduser'] = 'End users';
        en['clients'] = 'Owners';
        en['client'] = 'Owner';
        en['mantainers'] = 'Mantainers';
        en['mantainer'] = 'Mantainer';
        en['availabeusers'] = 'Available users';
        en['assignedusers'] = 'Assigned users';
        en['ismaster'] = 'Master';
        en['administration'] = "Administration";
        en['navigation'] = 'Navigation';
        en['cpuusage'] = 'cpu usage';
        en['batchrequest'] = 'batch request';
        en['currentjobs'] = 'current jobs';
        en['approved'] = 'approved';
        en['notapproved'] = 'not approved';
        en['locked'] = 'locked';
        en['enabled'] = 'enabled';
        en['waittime'] = 'wait time';
        en['hostname'] = 'hostname';
        en['userslist'] = 'Users List';
        en['select_a_role'] = 'Selete a role';
        en['adduser'] = 'Add user';
        en['userdetail'] = 'User detail';
        en['username'] = 'User name';
        en['usercomment'] = 'Comment';
        en['usercreation'] = 'Creation';
        en['userlastlogin'] = 'Last login';
        en['userisenabled'] = 'Is enabled';
        en['userisdisabled'] = 'Disabled';
        en['userislocked'] = 'Is locked';
        en['userisunlocked'] = 'Unlocked';
        en['deleteuser'] = 'Delete user';
        en['msgconfirmuserdelete'] = 'Confirm delete for user';
        en['msgoperationirreversible'] = 'This operation cannot be recovered';
        en['adduser'] = 'Add user';
        en['updateuser'] = 'Update user';
        en['resetuserpassword'] = 'Reset user password';
        en['oldpassword'] = 'Old password';
        en['newpassword'] = 'new password';
        en['addressbook'] = 'Address book';
        en['name'] = 'Name';
        
        en['address'] = 'Address';
        en['setaddress'] = 'Set address';
        
        en['project'] = 'Project';
        en['projects'] = 'Projects';
        en['editproject'] = 'Edit project';
        en['currentprojects'] = 'Current projects';
        en['availableprojects'] = 'Available projects';
        en['assignedprojects'] = 'Assigned projects';
        en['userprojects'] = 'User projects';

        en['installation'] = 'Installation';
        en['installations'] = 'Installations';
        en['currentinstallations'] = 'Current installations';

        //=========================================================

        my.get = function () {
            var resources = new Array();
            resources['it'] = it;
            resources['en'] = en;
            return resources;
        };

        return my;
    })({})
    
})(jQuery)