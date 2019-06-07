import * as validator from 'validator';
import { createRule } from "react-use-validator";
import i18n from "../../i18n";

export const required = createRule("required", value => !validator.isEmpty(value), () => i18n.t("field_required"));
