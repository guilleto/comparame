import AccessControl from 'accesscontrol';
const ac = new AccessControl();

ac.grant("supermaker")
    .readAny("plan")

ac.grant("admin")
    .extend("supermaker")
    .createAny("plan")
    .updateAny("plan")
    .deleteAny("plan")

export default ac;