const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";

// automate create req actiontypes
const createRequestTypes = base => ({
  [REQUEST]: `${base}_${REQUEST}`,
  [SUCCESS]: `${base}_${SUCCESS}`,
  [FAILURE]: `${base}_${FAILURE}`
});

export const OPENDOTA_MATCH = createRequestTypes("OPENDOTA_MATCH");
