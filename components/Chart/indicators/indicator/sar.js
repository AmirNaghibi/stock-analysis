import { merge, rebind } from "../utils";
import { sar } from "../calculator";
import baseIndicator from "./baseIndicator";
const ALGORITHM_TYPE = "SMA";
export default function () {
    const base = baseIndicator()
        .type(ALGORITHM_TYPE)
        .accessor((d) => d.sar);
    const underlyingAlgorithm = sar();
    const mergedAlgorithm = merge()
        .algorithm(underlyingAlgorithm)
        .merge((datum, i) => {
        datum.sar = i;
    });
    const indicator = (data, options = { merge: true }) => {
        if (options.merge) {
            if (!base.accessor()) {
                throw new Error(`Set an accessor to ${ALGORITHM_TYPE} before calculating`);
            }
            return mergedAlgorithm(data);
        }
        return underlyingAlgorithm(data);
    };
    rebind(indicator, base, "id", "accessor", "stroke", "echo", "type");
    rebind(indicator, underlyingAlgorithm, "options", "undefinedLength");
    rebind(indicator, mergedAlgorithm, "merge");
    return indicator;
}
//# sourceMappingURL=sar.js.map