// import React from "react";
// import {
//   Jumbotron,
//   Container,
//   CardColumns,
//   Card,
//   Button,
// } from "react-bootstrap";
// import { useQuery, useMutation } from "@apollo/client";
// import Auth from "../utils/auth";
// import { REMOVE_PERMISSION } from "../utils/mutations";
// import { QUERY_PERMISSIONS } from "../utils/queries";
// const PermissionsList = () => {
//   const [removePermission] = useMutation(REMOVE_PERMISSION);
//   const { loading, data } = useQuery(QUERY_PERMISSIONS);
//   const userData = data?.me || {};
  
//   // create function that accepts the book's mongo _id value as param and deletes the book from the database
//   const handleDeletePermission = async (accessEvent) => {
//     const token = Auth.loggedIn() ? Auth.getToken() : null;
//     if (!token) {
//       return false;
//     }
//     try {
//       const { data } = await removePermission({
//         variables: { accessEvent },
//       });
//       console.log(data);
//       return data;
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   // if data isn't here yet, say so
//   if (loading) {
//     return <h2>LOADING...</h2>;
//   }
//   return (
//     <>
//       <Jumbotron fluid className="text-light bg-dark">
//         <Container>
//           <h1>Viewing permissions!</h1>
//         </Container>
//       </Jumbotron>
//       <Container>
//         <h2>
//           {userData.permissionslist?.length
//             ? `Viewing ${userData.permissionslist.length} saved ${
//                 userData.permissionslist.length === 1 ? "permission" : "permissions"
//               }:`
//             : "You have no permissions!"}
//         </h2>
//         <CardColumns>
//           {userData.permissionslist?.map((permissions) => {
//             return (
//               <Card key={permissions.accessEvent} border="dark">
//                 <Card.Body>
//                   <Card.Title>{permissions.accessTier}</Card.Title>
//                   <p className="small">Admin who created this permission: {permissions.accessCreator}</p>
//                   <Card.Text>{permissions.accessArea}</Card.Text>
//                   <Button
//                     className="btn-block btn-danger"
//                     onClick={() => handleDeletePermission(permissions.accessEvent)}
//                   >
//                     Delete this permission!
//                   </Button>
//                 </Card.Body>
//               </Card>
//             );
//           })}
//         </CardColumns>
//       </Container>
//     </>
//   );
// };
// export default PermissionsList;

