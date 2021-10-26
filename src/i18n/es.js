import spanishMessages from "ra-language-spanish";

export default {
  ...spanishMessages,
  synapseadmin: {
    auth: {
      base_url: "Homeserver URL",
      welcome: "SIILVE",
      username_error: "Please enter fully qualified user ID: '@user:domain'",
      protocol_error: "URL has to start with 'http://' or 'https://'",
      url_error: "Not a valid Matrix server URL",
      server_version: "Version",
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
        title: "Borrar conversaci&oacute;n",
        message: "Esta seguro de querer borrar la conversaci&oacute;n? Esta accion no podra volverse atras. Todos los mensajes y archivos multimedia compartidos en la conversaci&oacuye;n seran eliminados de manera permanente!",
      },
    },
  },
  import_users: {
    error: {
      at_entry: "En el registro %{entry}: %{message}",
      error: "Error",
      required_field: "El campo '%{field}' es requerido y no esta presente",
      invalid_value:
        "Valor invalido en la linea %{row}. '%{field}' el valor debe ser 'true' o 'false'",
      unreasonably_big:
        "Se rechazo el procesamiento de un archivo muy grande de %{size} megabytes",
      already_in_progress: "Una tarea de importacion ya se envuentra en progreso",
      id_exits: "ID %{id} ya se encuentra utilizada",
    },
    title: "Importar usuaries via CSV",
    goToPdf: "Ir al PDF",
    cards: {
      importstats: {
        header: "Importar usuaries",
        users_total:
          "%{smart_count} usuarie en el archivo CSV |||| %{smart_count} usuaries en el archivo CSV",
        guest_count: "%{smart_count} invitade |||| %{smart_count} invitades",
        admin_count: "%{smart_count} administrador/a |||| %{smart_count} administradoras/es",
      },
      conflicts: {
        header: "Resolucion de conflictos",
        mode: {
          stop: "Detenerse ante un conflicto",
          skip: "Mostrar el error e ignorar el conflicto",
        },
      },
      ids: {
        header: "IDs",
        all_ids_present: "IDs presente en todos los registros",
        count_ids_present:
          "%{smart_count} registro con  ID |||| %{smart_count} registros con IDs",
        mode: {
          ignore: "Ignorar IDs en CSV y crear nuevos",
          update: "Actualizar los registros existentes",
        },
      },
      passwords: {
        header: "Passwords",
        all_passwords_present: "Passwords presentes en todos los registros",
        count_passwords_present:
          "%{smart_count} registro con password |||| %{smart_count} registros con passwords",
        use_passwords: "Usar la passwords desde el archivo CSV",
      },
      upload: {
        header: "Ingresar un archivo CSV",
        explanation:
          "Surbir un archivo CSV (1 registros por linea separando valores con comas) para ser procesado en la creacion o actualizacion de usuarios. El archivo debe incluir obligatoriamente los campos  'id' y 'displayname'. Se recomienda utilizar el documento de ejemplo para adaptarlo: ",
      },
      startImport: {
        simulate_only: "Solo simular el procedimiento",
        run_import: "IMPORTAR",
      },
      results: {
        header: "Resultados de la importacion",
        total:
          "%{smart_count} registro en total |||| %{smart_count} registros en total",
        successful: "%{smart_count} registros importados con exito",
        skipped: "%{smart_count} registros ignorados",
        download_skipped: "Descargar registros ignorados",
        with_error:
          "%{smart_count} registro con error ||| %{smart_count} registros con errores",
        simulated_only: "El procedimiento fue solo una SIMULACION",
      },
    },
  },
  resources: {
    users: {
      backtolist: "Volver a la lista",
      name: "Usuarie |||| Usuaries",
      email: "Email",
      msisdn: "Telefono",
      threepid: "Email / Telefono",
      workcalendar: "Horario",
      workcalendars: "Horarios por día",
      location_on: "Ubicación",
      lun: "Lunes",
      mar: "Martes",
      mie: "Miercoles",
      jue: "Jueves",
      vie: "Viernes",
      sab: "Sabado",
      dom: "Domingo",
      prov_tucuman: "Tucuman",
      prov_larioja: "La Rioja",
      prov_catamarca: "Catamarca",
      prov_entrerios: "Entre Rios",
      prov_jujuy: "Jujuy",
      prov_salta: "Salta",
      prov_santiagodelestero: "Santiago del Estero",
      prov_misiones: "Misiones",
      prov_corrientes: "Corrientes",
      prov_chaco: "Chaco",
      prov_formosa: "Formosa",
      prov_buenosaires: "Buenos Aires",
      depto_tuc_capital: "Tucumán - Capital",
      depto_tuc_tafiviejo: "Tucumán - Tafi Viejo",
      depto_tuc_cruzalta: "Tucumán - Cruz Alta",
      depto_rio_capital: "La Rioja - Capital",
      depto_rio_chilecito: "La Rioja - Chilecito",
      depto_rio_rosarioverapenialoza: "La Rioja - Rosario Vera Peñaloza",
      depto_cat_capital: "Catamarca - Capital",
      depto_cat_belen: "Catamarca - Belen",
      depto_cat_valleviejo: "Catamarca - Valle Viejo",
      depto_ent_parana: "Entre Rios - Parana",
      depto_ent_concordia: "Entre Rios - Concordia",
      depto_ent_gualeguaychu: "Entre Rios - Gualeguaychu",
      depto_juj_manuelbelgrano: "Jujuy - Manuel Belgrano",
      depto_juj_sanpedro: "Jujuy - San Pedro",
      depto_sal_capital: "Salta - Capital",
      depto_sal_oran: "Salta - Oran",
      depto_sgt_capital: "Santiago del Estero - Capital",
      depto_sgt_banda: "Santiago del Estero - La Banda",
      depto_sgt_riohondo: "Santiago del Estero - Rio Hondo",
      depto_sgt_robles: "Santiago del Estero - Robles",
      depto_mis_capital: "Misiones - Capital",
      depto_mis_guarani: "Misiones - Guarani",
      depto_mis_obera: "Misiones - Obera",
      depto_cor_capital: "Corrientes - Capital",
      depto_cor_goya: "Corrientes - Goya",
      depto_cha_sanfernando: "Chaco - San Fernando",
      depto_cha_gralguemes: "Chaco - Gral. Guemes",
      depto_cha_chacabuco: "Chaco - Chacabuco",
      depto_for_formosa: "Formosa - Formosa",
      depto_for_pilcomayo: "Formosa - Pilcomayo",
      depto_bue_quilmes: "Buenos Aires - Quilmes",
      depto_bue_lanus: "Buenos Aires - Lanus",
      depto_bue_moron: "Buenos Aires - Moron",
      depto_bue_altebrown: "Buenos Aires - Alte. Brown",
      depto_bue_sanmartin: "Buenos Aires - San Martin",
      depto_bue_sanisidro: "Buenos Aires - San Isidro",
      fields: {
        avatar: "Avatar",
        id: "User-ID",
        name: "Nombre",
        is_guest: "Invitade",
        admin: "Administrator",
        deactivated: "Desactivar",
        guests: "Mostrar invitados",
        show_deactivated: "Mostrar usuarios desactivados",
        user_id: "Buscar usuaries",
        displayname: "Nombre visible",
        password: "Password",
        avatar_url: "Avatar URL",
        avatar_src: "Avatar",
        medium: "Medio",
        threepids: "3PIDs",
        workcalendar: "Horario disponible",
        workcalendars: "Horarios por día",
        address: "Contenido",
        day: "Dia",
        state: "Provincia",
        departament: "Departamento",
        school: "Escuela, Centro de Salud",
        time_start: "Hora de inicio",
        time_end: "Hora de finalizacion",
        creation_ts_ms: "Fecha de alta",
        consent_version: "Version del consentimiento",
        // Devices:
        device_id: "Dispositivo-ID",
        display_name: "Nombre del dispositivo",
        last_seen_ts: "Fecha y hora",
        last_seen_ip: "IP",
      },
      helper: {
        deactivate: "Al desactivarlo NO es posible luego reactivarlos",
        erase: "Marcar el usuari como borrador segun GDPR",
      },
      action: {
        erase: "Borrar informacion del usuarie",
      },
    },
    rooms: {
      name: "Conversaci&oacute;n |||| Conversaciones",
      fields: {
        room_id: "Conversacion-ID",
        name: "Nombre",
        canonical_alias: "Alias",
        joined_members: "Miembros",
        joined_local_members: "Miembros locales",
        state_events: "State events",
        version: "Version",
        is_encrypted: "Encriptado",
        encryption: "Encriptacion",
        federatable: "Federable",
        public: "Publico",
        creator: "Creador/a",
        join_rules: "Reglas de ingreso",
        guest_access: "Acceso a invitades",
        history_visibility: "Visibilidad del historial",
      },
      enums: {
        join_rules: {
          public: "P&uacute;blico",
          knock: "Golpe",
          invite: "Invitacion",
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
      name: "Noticias desde el servidor",
      send: "Enviar noticia del servidor",
      fields: {
        body: "Mensaje",
      },
      action: {
        send: "Enviar noticia",
        send_success: "La notiica del servidor se envio correctamente.",
        send_failure: "Ocurrio un error.",
      },
      helper: {
        send:
          'Enviar noticias desde el servidor a determinados usuaries.',
      },
    },
  },
};
