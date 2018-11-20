!include "nsInstallDependSettings.nsh"
;!include "StdUtils.nsh"
;自定义宏
!define FILE_VERSION "4.0.1.0"
;初始化变量
;多语言 
!insertmacro MUI_LANGUAGE "SimpChinese"
LangString LANG_MESSAGE ${LANG_SIMPCHINESE} "zh-CN"

LangString MUTEX_MESSAGE ${LANG_SIMPCHINESE} "有一个${PRODUCT_NAME}安装向导已经运行！"
LangString VERSION_COMPARE_MESSAGE ${LANG_SIMPCHINESE} "已安装的版本高于当前版本，是否继续安装？"
LangString APP_RUNNING_MESSAGE ${LANG_SIMPCHINESE} "当前程序正在运行，是否强制结束，继续安装？"
LangString APP_EXIT_MESSAGE ${LANG_SIMPCHINESE} "您确认退出安装过程？"
LangString SELECT_FOLD_MESSAGE ${LANG_SIMPCHINESE} "请选择文件夹"
;onInit扩展操作
Function OnInitExt
FunctionEnd
;初始化界面扩展操作
Function InstallProgressExt
	;最小化按钮绑定函数
   nsSkinEngine::NSISFindControl "InstallTab_sysMinBtn"
   Pop $0
   ${If} $0 == "${NOFIND}"
    MessageBox MB_OK "Do not have InstallTab_sysMinBtn"
   ${Else}
    GetFunctionAddress $0 OnInstallMinFunc
    nsSkinEngine::NSISOnControlBindNSISScript "InstallTab_sysMinBtn" $0
   ${EndIf}
   
    ;返回
   nsSkinEngine::NSISFindControl "Select_InstallCancel_Btn"
   Pop $0
   ${If} $0 != "${NOFIND}"
    GetFunctionAddress $0 InstallBackTab    
        nsSkinEngine::NSISOnControlBindNSISScript "Select_InstallCancel_Btn"  $0
   ${EndIf}
   
   nsSkinEngine::NSISFindControl "Install_close_Btn"
   Pop $0
   ${If} $0 != "${NOFIND}"
    GetFunctionAddress $0 FinishDo    
        nsSkinEngine::NSISOnControlBindNSISScript "Install_close_Btn"  $0
   ${EndIf}
FunctionEnd
;下一步扩展操作
Function InstallNextTabExt
FunctionEnd

;安装过程中扩展操作
Function InstallingExt
	nsSkinEngine::NSISInitAnimationBkControl "bkAnimLayout" "$varResourceDir$(LANG_MESSAGE)" "3" "1" "1" "1" "0" 0 0
	nsSkinEngine::NSISStartAnimationBkControl "bkAnimLayout" "1" "2000"
FunctionEnd
;开始安装扩展操作
Function InstallPageFuncExt
	Call InstallPageFunc
FunctionEnd
;自定义安装扩展操作
Function CustomInstallFuncExt
	Call InstallNextTab
FunctionEnd
;注册信息扩展操作
Function RegistKeysExt
FunctionEnd
;扩展Sectipn
Function SectionFuncExt
   Call SectionInstallDependFuncExt
FunctionEnd
;安装完成阶段扩展操作
Function InstallCompleteExt
	nsSkinEngine::NSISStopAnimationBkControl "bkAnimLayout"
    nsSkinEngine::NSISSetControlData "bkAnimLayout"  "$varResourceDirinstall_success_bg.png"  "bkimage"
FunctionEnd

Function FinishDo
	nsSkinEngine::NSISHideSkinEngine
	nsSkinEngine::NSISGetControlData "deskShortCheckBox" "Checked" ;
    Pop $0
    ${If} $0 == "${CHECKED}"
		CreateShortCut "$DESKTOP\${PRODUCT_NAME}.lnk" "$INSTDIR\${MAIN_LAUNCHAPP_NAME}"
		ShellLink::SetRunAsAdministrator "$DESKTOP\${PRODUCT_NAME}.lnk"
    ${EndIf}
	nsSkinEngine::NSISGetControlData "pinShortCheckBox" "Checked" ;
    Pop $0
    ${If} $0 == "${CHECKED}"
        ${StdUtils.InvokeShellVerb} $0 "$oldInstallPath" "${MAIN_LAUNCHAPP_NAME}" ${StdUtils.Const.ShellVerb.UnpinFromTaskbar}
		${StdUtils.InvokeShellVerb} $0 "$INSTDIR" "${MAIN_LAUNCHAPP_NAME}" ${StdUtils.Const.ShellVerb.PinToTaskbar}
		
		${StdUtils.InvokeShellVerb} $0 "$oldInstallPath" "${MAIN_LAUNCHAPP_NAME}" ${StdUtils.Const.ShellVerb.UnpinFromStart}
		${StdUtils.InvokeShellVerb} $0 "$INSTDIR" "${MAIN_LAUNCHAPP_NAME}" ${StdUtils.Const.ShellVerb.PinToStart}
    ${EndIf}
	nsSkinEngine::NSISGetControlData "autoRunCheckBox" "Checked" ;
    Pop $0
    ${If} $0 == "${CHECKED}"
	${OrIf} $isAutoRun == "1"
      WriteRegStr HKCU "${PRODUCT_AUTORUN_KEY}" "${PRODUCT_NAME}" "$INSTDIR\${MAIN_LAUNCHAPP_NAME} -mini"
    ${EndIf}
	nsSkinEngine::NSISExitSkinEngine "false"
FunctionEnd