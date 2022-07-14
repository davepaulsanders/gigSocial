import React from "react";
import { BUTTON, SONG } from "../../styled-components/styled-components";
import "./Profile.css";
const CLIENT_ID =
"Q5kRxC0twZ2MRDhNOFRYuNme6W1LiGmPols-Dddpwup8cnBQ5AB9h-mk_Y11O43M";
const CLIENT_SECRET =
"UDZmx2IDkOMuHphTTh6J3YU77NxcZqX2tpdx5bQykIGKWlnIGRp1rngHPSRG_Xy7vFuGPmoUJRszeAfDBT4iFQ";
const link = `https://api.genius.com/oauth/authorize?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=https://localhost:3000/profile&scope=me&state=statevalue&response_type=code`;

export const Profile = () => {
  return (
    <div>
      <a href={link}>
        <BUTTON>Click to connect to genius</BUTTON>
      </a>
    </div>
  );
};
