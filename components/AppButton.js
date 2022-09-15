import { Text, TouchableHighlight } from "react-native";
import { globalStyles } from "../utility/globalStyles";

export default function AppButton({ label, style = [], ...otherProps }) {
    return <TouchableHighlight style={[globalStyles.btnPrimary, globalStyles.mt2, ...style, otherProps?.disabled && globalStyles.btnDisabled]} {...otherProps}>
        <Text style={[globalStyles.btnText, otherProps?.disabled && globalStyles.textDisabled]}>{label}</Text>
    </TouchableHighlight>

}