import React from "react";

/**
 * Used for indicating whether the "CTA Bar" is currently visible to the user.
 *
 * Useful for e.g. rendering _another_ bar under the CTA bar (otherwise rendering it at the top, if the CTA Bar already exists)
 */

export default React.createContext(true);
