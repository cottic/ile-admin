import spanishMessages from "ra-language-spanish";

export default {
  ...spanishMessages,
  synapseadmin: {
    auth: {
      base_url: "Homeserver URL",
      welcome: "Bienvenido a Synapse-admin",
      username_error: "Please enter fully qualified user ID: '@user:domain'",
      protocol_error: "URL has to start with 'http://' or 'https://'",
      url_error: "Not a valid Matrix server URL",
    },
    users: {
      invalid_user_id:
        "Must be a fully qualified Matrix user-id, e.g. @user_id:homeserver",
    },
    rooms: {
      tabs: {
        basic: "Basica",
        members: "Miembros",
        detail: "Detalle",
        permission: "Permisos",
      },
      delete: {
        title: "Borrar conversaci&oacuye;n",
        message: "Esta seguro de querer borrar la conversaci&oacuye;n? Esta accion no podra volverse atras. Todos los mensajes y archivos multimedia compartidos en la conversaci&oacuye;n seran eliminados de manera permanente!",
      },
    },
  },
  import_users: {
    error: {
      at_entry: "At entry %{entry}: %{message}",
      error: "Error",
      required_field: "Required field '%{field}' is not present",
      invalid_value:
        "Invalid value on line %{row}. '%{field}' field may only be 'true' or 'false'",
      unreasonably_big:
        "Refused to load unreasonably big file of %{size} megabytes",
      already_in_progress: "An import run is already in progress",
      id_exits: "ID %{id} already present",
    },
    title: "Importar usuarios via CSV",
    goToPdf: "Ir al PDF",
    cards: {
      importstats: {
        header: "Importar usuarios",
        users_total:
          "%{smart_count} user in CSV file |||| %{smart_count} users in CSV file",
        guest_count: "%{smart_count} guest |||| %{smart_count} guests",
        admin_count: "%{smart_count} admin |||| %{smart_count} admins",
      },
      conflicts: {
        header: "Conflict strategy",
        mode: {
          stop: "Stop on conflict",
          skip: "Show error and skip on conflict",
        },
      },
      ids: {
        header: "IDs",
        all_ids_present: "IDs present on every entry",
        count_ids_present:
          "%{smart_count} entry with ID |||| %{smart_count} entries with IDs",
        mode: {
          ignore: "Ignore IDs in CSV and create new ones",
          update: "Update existing records",
        },
      },
      passwords: {
        header: "Passwords",
        all_passwords_present: "Passwords present on every entry",
        count_passwords_present:
          "%{smart_count} entry with password |||| %{smart_count} entries with passwords",
        use_passwords: "Use passwords from CSV",
      },
      upload: {
        header: "Input CSV file",
        explanation:
          "Here you can upload a file with comma separated values that is processed to create or update users. The file must include the fields 'id' and 'displayname'. You can download and adapt an example file here: ",
      },
      startImport: {
        simulate_only: "Simulate only",
        run_import: "Import",
      },
      results: {
        header: "Import results",
        total:
          "%{smart_count} entry in total |||| %{smart_count} entries in total",
        successful: "%{smart_count} entries successfully imported",
        skipped: "%{smart_count} entries skipped",
        download_skipped: "Download skipped records",
        with_error:
          "%{smart_count} entry with errors ||| %{smart_count} entries with errors",
        simulated_only: "Run was only simulated",
      },
    },
  },
  resources: {
    users: {
      backtolist: "Volver a la lista",
      name: "Usuario |||| Usuarios",
      email: "Email",
      msisdn: "Telefono",
      threepid: "Email / Telefono",
      fields: {
        avatar: "Avatar",
        id: "User-ID",
        name: "Nombre",
        is_guest: "Invitado",
        admin: "Administrator",
        deactivated: "Desactivar",
        guests: "Mostrar invitados",
        show_deactivated: "Mostrar usuarios desactivados",
        user_id: "Buscar usuarios",
        displayname: "Nombre visible",
        password: "Password",
        avatar_url: "Avatar URL",
        avatar_src: "Avatar",
        medium: "Medio",
        threepids: "3PIDs",
        address: "Contenido",
        creation_ts_ms: "Fecha de creaci&oacuye;n",
        consent_version: "Consent version",
        // Devices:
        device_id: "Dispositivo-ID",
        display_name: "Nombre del dispositivo",
        last_seen_ts: "Fecha y hora",
        last_seen_ip: "IP",
      },
      helper: {
        deactivate: "Deactivated users cannot be reactivated",
        erase: "Mark the user as GDPR-erased",
      },
      action: {
        erase: "Borrar informaci&oacuye;n del usuario",
      },
    },
    rooms: {
      name: "Conversaci&oacuye;n |||| Conversaciones",
      fields: {
        room_id: "Conversasici&oacuye;n-ID",
        name: "Nombre",
        canonical_alias: "Alias",
        joined_members: "Miembres",
        joined_local_members: "Miembros locales",
        state_events: "State events",
        version: "Version",
        is_encrypted: "Encriptado",
        encryption: "Encriptación",
        federatable: "Federable",
        public: "Publico",
        creator: "Creador",
        join_rules: "Reglas de ingreso",
        guest_access: "Acceso a invitados",
        history_visibility: "Visibilidad del historial",
      },
      enums: {
        join_rules: {
          public: "Publico",
          knock: "Golpe",
          invite: "Invitaci&oacuye;n",
          private: "Privado",
        },
        guest_access: {
          can_join: "Los invitados pueden entrar",
          forbidden: "Los invitados NO pueden entrar",
        },
        history_visibility: {
          invited: "Solo invitados",
          joined: "Solo ingresando",
          shared: "Solo compartidos",
          world_readable: "Cualquiera",
        },
        unencrypted: "Desencriptado",
      },
    },
    connections: {
      name: "Conecciones",
      fields: {
        last_seen: "Fecha",
        ip: "IP",
        user_agent: "Agente del usuario",
      },
    },
    devices: {
      name: "Dispositivo |||| Dispositivos",
      action: {
        erase: {
          title: "Remover %{id}",
          content: 'Are you sure you want to remove the device "%{name}"?',
          success: "Device successfully removed.",
          failure: "An error has occurred.",
        },
      },
    },
    servernotices: {
      name: "Mensajes del servidor",
      send: "Enviar mensaje del servidor",
      fields: {
        body: "Mensaje",
      },
      action: {
        send: "Enviar nota",
        send_success: "Server notice successfully sent.",
        send_failure: "An error has occurred.",
      },
      helper: {
        send:
          'Sends a server notice to the selected users. The feature "Server Notices" has to be activated at the server.',
      },
    },
  },
};
