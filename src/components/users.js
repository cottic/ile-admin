import React, { cloneElement, Fragment } from "react";
import Avatar from "@material-ui/core/Avatar";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DevicesIcon from "@material-ui/icons/Devices";
import GetAppIcon from "@material-ui/icons/GetApp";
import SettingsInputComponentIcon from "@material-ui/icons/SettingsInputComponent";
import {
  ArrayInput,
  ArrayField,
  Button,
  Datagrid,
  DateField,
  Create,
  Edit,
  List,
  Filter,
  Toolbar,
  SimpleForm,
  SimpleFormIterator,
  TabbedForm,
  FormTab,
  BooleanField,
  BooleanInput,
  PasswordInput,
  TextField,
  TextInput,
  NumberInput,
  ReferenceField,
  ReferenceManyField,
  SearchInput,
  SelectInput,
  BulkDeleteButton,
  DeleteButton,
  SaveButton,
  regex,
  required,
  useRedirect,
  useTranslate,
  Pagination,
  CreateButton,
  ExportButton,
  TopToolbar,
  sanitizeListRestProps,
} from "react-admin";
import { ServerNoticeButton, ServerNoticeBulkButton } from "./ServerNotices";
import { DeviceRemoveButton } from "./devices";
import { makeStyles } from "@material-ui/core/styles";

const redirect = (basePath, id, data) => {
  return {
    pathname: "/import_users",
  };
};

const useStyles = makeStyles({
  small: {
    height: "40px",
    width: "40px",
  },
  large: {
    height: "120px",
    width: "120px",
    float: "right",
  },
});

const UserListActions = ({
  currentSort,
  className,
  resource,
  filters,
  displayedFilters,
  exporter, // you can hide ExportButton if exporter = (null || false)
  filterValues,
  permanentFilter,
  hasCreate, // you can hide CreateButton if hasCreate = false
  basePath,
  selectedIds,
  onUnselectItems,
  showFilter,
  maxResults,
  total,
  ...rest
}) => {
  const redirectTo = useRedirect();
  return (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
      {filters &&
        cloneElement(filters, {
          resource,
          showFilter,
          displayedFilters,
          filterValues,
          context: "button",
        })}
      <CreateButton basePath={basePath} />
      <ExportButton
        disabled={total === 0}
        resource={resource}
        sort={currentSort}
        filter={{ ...filterValues, ...permanentFilter }}
        exporter={exporter}
        maxResults={maxResults}
      />
      {/* Add your custom actions */}
      <Button
        onClick={() => {
          redirectTo(redirect);
        }}
        label="CSV Import"
      >
        <GetAppIcon style={{ transform: "rotate(180deg)", fontSize: "20" }} />
      </Button>
    </TopToolbar>
  );
};

UserListActions.defaultProps = {
  selectedIds: [],
  onUnselectItems: () => null,
};

const UserPagination = props => (
  <Pagination {...props} rowsPerPageOptions={[10, 25, 50, 100, 500, 1000]} />
);

const UserFilter = props => (
  <Filter {...props}>
    <SearchInput source="name" alwaysOn />
    <BooleanInput source="guests" alwaysOn />
    <BooleanInput
      label="resources.users.fields.show_deactivated"
      source="deactivated"
      alwaysOn
    />
  </Filter>
);

const UserBulkActionButtons = props => {
  const translate = useTranslate();
  return (
    <Fragment>
      <ServerNoticeBulkButton {...props} />
      <BulkDeleteButton
        {...props}
        label="resources.users.action.erase"
        title={translate("resources.users.helper.erase")}
      />
    </Fragment>
  );
};

const AvatarField = ({ source, className, record = {} }) => (
  <Avatar src={record[source]} className={className} />
);

export const UserList = props => {
  const classes = useStyles();
  return (
    <List
      {...props}
      filters={<UserFilter />}
      filterDefaultValues={{ guests: true, deactivated: false }}
      actions={<UserListActions maxResults={10000} />}
      bulkActionButtons={<UserBulkActionButtons />}
      pagination={<UserPagination />}
    >
      <Datagrid rowClick="edit">
        <AvatarField
          source="avatar_src"
          sortable={false}
          className={classes.small}
        />
        <TextField source="id" sortable={false} />
        <TextField source="displayname" sortable={false} />
        <BooleanField source="is_guest" sortable={false} />
        <BooleanField source="admin" sortable={false} />
        <BooleanField source="deactivated" sortable={false} />
      </Datagrid>
    </List>
  );
};

// https://matrix.org/docs/spec/appendices#user-identifiers
const validateUser = regex(
  /^@[a-z0-9._=\-/]+:.*/,
  "synapseadmin.users.invalid_user_id"
);

export function generateRandomUser() {
  const homeserver = localStorage.getItem("home_server");
  const user_id =
    "@" +
    Array(8)
      .fill("0123456789abcdefghijklmnopqrstuvwxyz")
      .map(
        x =>
          x[
            Math.floor(
              (crypto.getRandomValues(new Uint32Array(1))[0] /
                (0xffffffff + 1)) *
                x.length
            )
          ]
      )
      .join("") +
    ":" +
    homeserver;

  const password = Array(20)
    .fill(
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$"
    )
    .map(
      x =>
        x[
          Math.floor(
            (crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1)) *
              x.length
          )
        ]
    )
    .join("");

  return {
    id: user_id,
    password: password,
  };
}

const UserEditToolbar = props => {
  const translate = useTranslate();
  return (
    <Toolbar {...props}>
      <SaveButton submitOnEnter={true} />
      <DeleteButton
        label="resources.users.action.erase"
        title={translate("resources.users.helper.erase")}
      />
      <ServerNoticeButton />
    </Toolbar>
  );
};

export const UserCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="id" autoComplete="off" validate={validateUser} />
      <TextInput source="displayname" />
      <PasswordInput source="password" autoComplete="new-password" />
      <BooleanInput source="admin" />
      <ArrayInput source="threepids">
        <SimpleFormIterator>
          <SelectInput
            source="medium"
            choices={[
              { id: "email", name: "resources.users.email" },
              { id: "msisdn", name: "resources.users.msisdn" },
            ]}
          />
			  <TextInput source="address" />
        </SimpleFormIterator>
      </ArrayInput>
	  <SelectInput
		source="departament"
		choices={[
      { id: "depto_bue_quilmes", name: "resources.users.depto_bue_quilmes"},
      { id: "depto_bue_lanus", name: "resources.users.depto_bue_lanus"},
      { id: "depto_bue_moron", name: "resources.users.depto_bue_moron"},
      { id: "depto_bue_altebrown", name: "resources.users.depto_bue_altebrown"},
      { id: "depto_bue_sanmartin", name: "resources.users.depto_bue_sanmartin"},
      { id: "depto_bue_sanisidro", name: "resources.users.depto_bue_sanisidro"},
      { id: "depto_cat_capital", name: "resources.users.depto_cat_capital"},
      { id: "depto_cat_belen", name: "resources.users.depto_cat_belen"},
      { id: "depto_cat_valleviejo", name: "resources.users.depto_cat_valleviejo"},
      { id: "depto_cha_sanfernando", name: "resources.users.depto_cha_sanfernando"},
      { id: "depto_cha_gralguemes", name: "resources.users.depto_cha_gralguemes"},
      { id: "depto_cha_chacabuco", name: "resources.users.depto_cha_chacabuco"},
      { id: "depto_cor_capital", name: "resources.users.depto_cor_capital"},
      { id: "depto_cor_goya", name: "resources.users.depto_cor_goya"},
      { id: "depto_ent_parana", name: "resources.users.depto_ent_parana"},
      { id: "depto_ent_concordia", name: "resources.users.depto_ent_concordia"},
      { id: "depto_ent_gualeguaychu", name: "resources.users.depto_ent_gualeguaychu"},
      { id: "depto_for_formosa", name: "resources.users.depto_for_formosa"},
      { id: "depto_for_pilcomayo", name: "resources.users.depto_for_pilcomayo"},
      { id: "depto_juj_manuelbelgrano", name: "resources.users.depto_juj_manuelbelgrano"},
      { id: "depto_juj_sanpedro", name: "resources.users.depto_juj_sanpedro"},
      { id: "depto_rio_capital", name: "resources.users.depto_rio_capital"},
      { id: "depto_rio_chilecito", name: "resources.users.depto_rio_chilecito"},
      { id: "depto_rio_rosarioverapenialoza", name: "resources.users.depto_rio_rosarioverapenialoza"},
      { id: "depto_mis_capital", name: "resources.users.depto_mis_capital"},
      { id: "depto_mis_guarani", name: "resources.users.depto_mis_guarani"},
      { id: "depto_mis_obera", name: "resources.users.depto_mis_obera"},
      { id: "depto_sgt_capital", name: "resources.users.depto_sgt_capital"},
      { id: "depto_sgt_banda", name: "resources.users.depto_sgt_banda"},
      { id: "depto_sgt_riohondo", name: "resources.users.depto_sgt_riohondo"},
      { id: "depto_sgt_robles", name: "resources.users.depto_sgt_robles"},
      { id: "depto_sal_capital", name: "resources.users.depto_sal_capital"},
      { id: "depto_sal_oran", name: "resources.users.depto_sal_oran"},
      { id: "depto_tuc_capital", name: "resources.users.depto_tuc_capital"},
      { id: "depto_tuc_tafiviejo", name: "resources.users.depto_tuc_tafiviejo"},
      { id: "depto_tuc_cruzalta", name: "resources.users.depto_tuc_cruzalta"},
		]}
		
	  />

    <TextInput source="school" />
		{/*
	  <SelectInput
		source="state"
		choices={[
		  { id: "bue", name: "resources.users.prov_buenosaires" },
		  { id: "cat", name: "resources.users.prov_catamarca" },
		  { id: "cha", name: "resources.users.prov_chaco" },
		  { id: "cor", name: "resources.users.prov_corrientes" },
		  { id: "ent", name: "resources.users.prov_entrerios" },
		  { id: "for", name: "resources.users.prov_formosa" },
		  { id: "juj", name: "resources.users.prov_jujuy" },
		  { id: "rio", name: "resources.users.prov_larioja" },
		  { id: "mis", name: "resources.users.prov_misiones" },
		  { id: "stg", name: "resources.users.prov_santiagodelestero" },
		  { id: "sal", name: "resources.users.prov_salta" },
		  { id: "tuc", name: "resources.users.prov_tucuman" },
		]}
		validate={[required()]}
	  /> */}
      <ArrayInput source="workcalendars" label="resources.users.workcalendars"> 
        <SimpleFormIterator>
          <SelectInput
            source="day"
            choices={[
              { id: "0", name: "resources.users.lun" },
              { id: "1", name: "resources.users.mar" },
              { id: "2", name: "resources.users.mie" },
              { id: "3", name: "resources.users.jue" },
              { id: "4", name: "resources.users.vie" },
              { id: "5", name: "resources.users.sab" },
              { id: "6", name: "resources.users.dom" },
            ]}
            validate={[required()]}
          />
          <NumberInput min="7" max="18" mobile="true" validate={[required()]} placeholder="7" source="time_start" />
          <NumberInput min="8" max="19" mobile="true" validate={[required()]} placeholder="19" source="time_end"/>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);

const UserTitle = ({ record }) => {
  const translate = useTranslate();
  return (
    <span>
      {translate("resources.users.name", {
        smart_count: 1,
      })}{" "}
      {record ? `"${record.displayname}"` : ""}
    </span>
  );
};
export const UserEdit = props => {
  const classes = useStyles();
  const translate = useTranslate();
  return (
    <Edit {...props} title={<UserTitle />}>
      <TabbedForm toolbar={<UserEditToolbar />}>
        <FormTab
          label={translate("resources.users.name", { smart_count: 1 })}
          icon={<PersonPinIcon />}
        >
          <AvatarField
            source="avatar_src"
            sortable={false}
            className={classes.large}
          />
          <TextInput source="id" disabled />
          <TextInput source="displayname" />
          <PasswordInput source="password" autoComplete="new-password" />
          <BooleanInput source="admin" />
          <BooleanInput
            source="deactivated"
            helperText="resources.users.helper.deactivate"
          />
          <DateField
            source="creation_ts_ms"
            showTime
            options={{
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }}
          />
          <TextField source="consent_version" />
        </FormTab>
        <FormTab
          label="resources.users.threepid"
          icon={<ContactMailIcon />}
          path="threepid"
        >
          <ArrayInput source="threepids">
            <SimpleFormIterator>
              <SelectInput
                source="medium"
                choices={[
                  { id: "email", name: "resources.users.email" },
                  { id: "msisdn", name: "resources.users.msisdn" },
                ]}
              />
              <TextInput source="address" />
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>
        <FormTab
          label="resources.users.location_on"
          icon={<LocationOnIcon />}
          path="locationon"
        >

              <SelectInput
                source="departament"
                choices={[
                  { id: "depto_bue_quilmes", name: "resources.users.depto_bue_quilmes"},
                  { id: "depto_bue_lanus", name: "resources.users.depto_bue_lanus"},
                  { id: "depto_bue_moron", name: "resources.users.depto_bue_moron"},
                  { id: "depto_bue_altebrown", name: "resources.users.depto_bue_altebrown"},
                  { id: "depto_bue_sanmartin", name: "resources.users.depto_bue_sanmartin"},
                  { id: "depto_bue_sanisidro", name: "resources.users.depto_bue_sanisidro"},
                  { id: "depto_cat_capital", name: "resources.users.depto_cat_capital"},
                  { id: "depto_cat_belen", name: "resources.users.depto_cat_belen"},
                  { id: "depto_cat_valleviejo", name: "resources.users.depto_cat_valleviejo"},
                  { id: "depto_cha_sanfernando", name: "resources.users.depto_cha_sanfernando"},
                  { id: "depto_cha_gralguemes", name: "resources.users.depto_cha_gralguemes"},
                  { id: "depto_cha_chacabuco", name: "resources.users.depto_cha_chacabuco"},
                  { id: "depto_cor_capital", name: "resources.users.depto_cor_capital"},
                  { id: "depto_cor_goya", name: "resources.users.depto_cor_goya"},
                  { id: "depto_ent_parana", name: "resources.users.depto_ent_parana"},
                  { id: "depto_ent_concordia", name: "resources.users.depto_ent_concordia"},
                  { id: "depto_ent_gualeguaychu", name: "resources.users.depto_ent_gualeguaychu"},
                  { id: "depto_for_formosa", name: "resources.users.depto_for_formosa"},
                  { id: "depto_for_pilcomayo", name: "resources.users.depto_for_pilcomayo"},
                  { id: "depto_juj_manuelbelgrano", name: "resources.users.depto_juj_manuelbelgrano"},
                  { id: "depto_juj_sanpedro", name: "resources.users.depto_juj_sanpedro"},
                  { id: "depto_rio_capital", name: "resources.users.depto_rio_capital"},
                  { id: "depto_rio_chilecito", name: "resources.users.depto_rio_chilecito"},
                  { id: "depto_rio_rosarioverapenialoza", name: "resources.users.depto_rio_rosarioverapenialoza"},
                  { id: "depto_mis_capital", name: "resources.users.depto_mis_capital"},
                  { id: "depto_mis_guarani", name: "resources.users.depto_mis_guarani"},
                  { id: "depto_mis_obera", name: "resources.users.depto_mis_obera"},
                  { id: "depto_sgt_capital", name: "resources.users.depto_sgt_capital"},
                  { id: "depto_sgt_banda", name: "resources.users.depto_sgt_banda"},
                  { id: "depto_sgt_riohondo", name: "resources.users.depto_sgt_riohondo"},
                  { id: "depto_sgt_robles", name: "resources.users.depto_sgt_robles"},
                  { id: "depto_sal_capital", name: "resources.users.depto_sal_capital"},
                  { id: "depto_sal_oran", name: "resources.users.depto_sal_oran"},
                  { id: "depto_tuc_capital", name: "resources.users.depto_tuc_capital"},
                  { id: "depto_tuc_tafiviejo", name: "resources.users.depto_tuc_tafiviejo"},
                  { id: "depto_tuc_cruzalta", name: "resources.users.depto_tuc_cruzalta"},
                ]}
                
              />

              <TextInput source="school"  />
			{/*
          <SelectInput
            source="state"
            choices={[
              { id: "bue", name: "resources.users.prov_buenosaires" },
              { id: "cat", name: "resources.users.prov_catamarca" },
              { id: "cha", name: "resources.users.prov_chaco" },
              { id: "cor", name: "resources.users.prov_corrientes" },
              { id: "ent", name: "resources.users.prov_entrerios" },
              { id: "for", name: "resources.users.prov_formosa" },
              { id: "juj", name: "resources.users.prov_jujuy" },
              { id: "rio", name: "resources.users.prov_larioja" },
              { id: "mis", name: "resources.users.prov_misiones" },
              { id: "stg", name: "resources.users.prov_santiagodelestero" },
              { id: "sal", name: "resources.users.prov_salta" },
              { id: "tuc", name: "resources.users.prov_tucuman" },
            ]}
            validate={[required()]}
          /> */}

        </FormTab>
        <FormTab
          label="resources.users.workcalendar"
          icon={<AccessTimeIcon />}
          path="workcalendar"
        >
          <ArrayInput source="workcalendars" label="resources.users.workcalendars">
            <SimpleFormIterator>
              <SelectInput
                source="day"
                choices={[
                  { id: "0", name: "resources.users.lun" },
                  { id: "1", name: "resources.users.mar" },
                  { id: "2", name: "resources.users.mie" },
                  { id: "3", name: "resources.users.jue" },
                  { id: "4", name: "resources.users.vie" },
                  { id: "5", name: "resources.users.sab" },
                  { id: "6", name: "resources.users.dom" },
                ]}
                validate={[required()]}
              />
              <NumberInput min="7" max="18" mobile="true" validate={[required()]} placeholder="7" source="time_start" />
              <NumberInput min="8" max="19" mobile="true" validate={[required()]} placeholder="19" source="time_end"/>
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>
        <FormTab
          label={translate("resources.devices.name", { smart_count: 2 })}
          icon={<DevicesIcon />}
          path="devices"
        >
          <ReferenceManyField
            reference="devices"
            target="user_id"
            addLabel={false}
          >
            <Datagrid style={{ width: "100%" }}>
              <TextField source="device_id" sortable={false} />
              <TextField source="display_name" sortable={false} />
              <TextField source="last_seen_ip" sortable={false} />
              <DateField
                source="last_seen_ts"
                showTime
                options={{
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }}
                sortable={false}
              />
              <DeviceRemoveButton />
            </Datagrid>
          </ReferenceManyField>
        </FormTab>
        <FormTab
          label="resources.connections.name"
          icon={<SettingsInputComponentIcon />}
          path="connections"
        >
          <ReferenceField
            reference="connections"
            source="id"
            addLabel={false}
            link={false}
          >
            <ArrayField
              source="devices[].sessions[0].connections"
              label="resources.connections.name"
            >
              <Datagrid style={{ width: "100%" }}>
                <TextField source="ip" sortable={false} />
                <DateField
                  source="last_seen"
                  showTime
                  options={{
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }}
                  sortable={false}
                />
                <TextField
                  source="user_agent"
                  sortable={false}
                  style={{ width: "100%" }}
                />
              </Datagrid>
            </ArrayField>
          </ReferenceField>
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};
