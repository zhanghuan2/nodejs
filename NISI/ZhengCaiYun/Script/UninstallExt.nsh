﻿;自定义宏
!define FILE_VERSION "4.0.1.0"
;初始化变量
Var installBiZhiPath
;多语言 
!insertmacro MUI_LANGUAGE "SimpChinese"
LangString LANG_MESSAGE ${LANG_SIMPCHINESE} "zh-CN"

LangString MUTEX_MESSAGE ${LANG_SIMPCHINESE} "有一个${PRODUCT_NAME_EN}卸载向导已经运行！"
LangString APP_RUNNING_MESSAGE ${LANG_SIMPCHINESE} "检测到您正在运行${PRODUCT_NAME}？"
LangString APP_RUNNING_MESSAGE_TXT ${LANG_SIMPCHINESE} "您可以：强制退出后安装，或取消安装"
LangString APP_EXIT_MESSAGE ${LANG_SIMPCHINESE} "是否退出卸载程序？"
;onInit扩展操作
Function OnInitExt
FunctionEnd
;初始化界面扩展操作
Function UninstallProgressExt
	;最小化按钮绑定函数
	nsSkinEngine::NSISFindControl "InstallTab_sysMinBtn"
	Pop $0
	${If} $0 == "-1"
	MessageBox MB_OK "Do not have InstallTab_sysMinBtn"
	${Else}
	GetFunctionAddress $0 OnInstallMinFunc
	nsSkinEngine::NSISOnControlBindNSISScript "InstallTab_sysMinBtn" $0
	${EndIf}
FunctionEnd
;开始卸载扩展操作
Function UnInstallPageFuncExt
	nsSkinEngine::NSISSetControlData "bkAnimLayout"  "$varResourceDiruninstall_ing_bg.png"  "bkimage"
FunctionEnd
;卸载完成阶段扩展操作
Function UnInstallCompleteExt
    Call OnNextBtnFunc
FunctionEnd
;卸载按钮点击扩展操作
Function OnCompleteBtnFuncExt
FunctionEnd
;私有方法，非通用

