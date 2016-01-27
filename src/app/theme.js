import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';

export default {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.red500,
    primary2Color: Colors.red500,
    primary3Color: Colors.grey600,

    accent1Color: Colors.orangeA200,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,

    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,

    canvasColor: Colors.white,

    borderColor: Colors.grey300,

    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),

    pickerHeaderColor: Colors.cyan500,

    /*


      :root {
        --dark-primary-color:       #455A64;
        --default-primary-color:    #607D8B;
        --light-primary-color:      #CFD8DC;
        --text-primary-color:       #FFFFFF;
        --accent-color:             #FF5722;
        --primary-background-color: #CFD8DC;
        --primary-text-color:       #212121;
        --secondary-text-color:     #727272;
        --disabled-text-color:      #BDBDBD;
        --divider-color:            #B6B6B6;


    primary1Color: _colors2.default.cyan700,
    primary2Color: _colors2.default.cyan700,
    primary3Color: _colors2.default.grey600,
    accent1Color: _colors2.default.pinkA200,
    accent2Color: _colors2.default.pinkA400,
    accent3Color: _colors2.default.pinkA100,
    textColor: _colors2.default.fullWhite,
    alternateTextColor: '#303030',
    canvasColor: '#303030',
    borderColor: _colorManipulator2.default.fade(_colors2.default.fullWhite, 0.3),
    disabledColor: _colorManipulator2.default.fade(_colors2.default.fullWhite, 0.3),
    pickerHeaderColor: _colorManipulator2.default.fade(_colors2.default.fullWhite, 0.12),
    clockCircleColor: _colorManipulator2.default.fade(_colors2.default.fullWhite, 0.12)
    */
  }
};
