﻿/*
    Compile the script to use the Unicode version of NSIS
    The producers：surou
*/
; 安装程序初始定义常量
!define UPDATE_TEMP_NAME "AutoUpdateSelf.exe"
!define UPDATE_NAME "AutoUpdate.exe"

; 引入的头文件
!include "MUI.nsh"
!include "FileFunc.nsh"
!include "StdUtils.nsh"
!include "nsPublic.nsh"
!include "nsSkinEngine.nsh"
!include "nsUtils.nsh"
!include "nsProcess.nsh"
!include "nsAutoUpdate.nsh"

;定义变量
Var Dialog
Var MessageBoxHandle
Var IsUpdateSelf
Var IsUpdateOther
Var IsAuto
Var IsForced
Var IsManual
Var IsBackstage
Var IsBanDisturb
Var IsHasUpdateMark
Var IsRunAs
Var IsAutoDown

Var varShowInstTimerId
Var varCurrentStep
Var varCurrentVersion
Var varLocalVersion
Var varCurrentParameters
Var varUpdateTempVersion
Var varResourceDir

!include "AutoUpdateExt.nsh"

;Request application privileges for Windows Vista
RequestExecutionLevel user
;文件版本声明-开始
VIProductVersion ${FILE_VERSION}
VIAddVersionKey /LANG=2052 "ProductName" "${PRODUCT_NAME}"
VIAddVersionKey /LANG=2052 "Comments" "${PRODUCT_COMMENTS}"
VIAddVersionKey /LANG=2052 "CompanyName" "${PRODUCT_COMMENTS}"
VIAddVersionKey /LANG=2052 "LegalTrademarks" "${PRODUCT_NAME_EN}"
VIAddVersionKey /LANG=2052 "LegalCopyright" "${PRODUCT_LegalCopyright}"
VIAddVersionKey /LANG=2052 "FileDescription" "${PRODUCT_NAME}升级程序"
VIAddVersionKey /LANG=2052 "FileVersion" ${FILE_VERSION}
VIAddVersionKey /LANG=2052 "ProductVersion" ${PRODUCT_VERSION}
!define MUI_ICON "..\Resource\Update\app.ico"
;Languages 
!insertmacro MUI_LANGUAGE "SimpChinese"

OutFile "..\..\..\Temp\Temp\AutoUpdate.exe"

;初始化数据

; 安装和卸载页面
Page         custom     InstallProgress

;刷新关联图标
Function RefreshShellIcons
  System::Call 'shell32.dll::SHChangeNotify(i, i, i, i) v \
  (${SHCNE_ASSOCCHANGED}, ${SHCNF_IDLIST}, 0, 0)'
FunctionEnd

Function KillAllProcess
	Pop $R1
	nsProcess::FindProcessByName "${MAIN_APP_NAME}"
	Pop $R0
	${If} $R0 == "${FINDPROCESS}"
	${AndIf} $R1 != ""
		nsProcess::KillProcessByPath "$EXEDIR\$R1"
	${Endif}
FunctionEnd

Function .onInit
   SetOutPath "${UNINSTALL_DIR}\Update"
   SetOverwrite try
   ${If} ${PRODUCT_RESOURCE_ENCRYPT_TYPE} == 0
     File /r /x *.db "..\Resource\Update\*.*"
     StrCpy $R0 "${UNINSTALL_DIR}\Update"
     StrCpy $varResourceDir "${UNINSTALL_DIR}\Update\"
   ${Else}
    File /nonfatal "..\..\..\Temp\Resource\Update${PRODUCT_VERSION}.dat"
	StrCpy $R0 "${UNINSTALL_DIR}\Update\Update${PRODUCT_VERSION}.dat"
    StrCpy $varResourceDir ""
  ${EndIf}
   ;初始化数据  安装目录
   nsSkinEngine::NSISInitSkinEngine /NOUNLOAD "$R0" "SimpChinese.xml" "WizardTab" "false" "${PRODUCT_NAME_EN}" "${PRODUCT_KEY}" "app.ico" "false"
   Pop $Dialog
   ;初始化MessageBox窗口
   nsSkinEngine::NSISInitMessageBox "MessageBox.xml" "TitleLabl" "TextLabl" "CloseBtn" "OkBtn" "YESBtn" "NOBtn" "AbortBtn" "RetryBtn" "IgnoreBtn" "cancelBtn"
   Pop $MessageBoxHandle
FunctionEnd

Function InstallProgress

   ;关闭按钮绑定函数
   nsSkinEngine::NSISFindControl "closebtn"
   Pop $0
   ${If} $0 == "${NOFIND}"
    nsSkinEngine::NSISMessageBox ${MB_OKCANCEL} "" "Do not have closebtn"
   ${Else}
    GetFunctionAddress $0 OnInstallCancelFunc
    nsSkinEngine::NSISOnControlBindNSISScript "closebtn" $0
   ${EndIf}
   
   nsSkinEngine::NSISFindControl "CancelCheckBtn"
   Pop $0
   ${If} $0 == "${NOFIND}"
    MessageBox MB_OK "Do not have CancelCheckBtn"
   ${Else}
    GetFunctionAddress $0 OnInstallCancelFunc
    nsSkinEngine::NSISOnControlBindNSISScript "CancelCheckBtn" $0
   ${EndIf}
   
   nsSkinEngine::NSISFindControl "CancelUpdateBtn"
   Pop $0
   ${If} $0 == "${NOFIND}"
    MessageBox MB_OK "Do not have CancelUpdateBtn"
   ${Else}
    GetFunctionAddress $0 OnInstallCancelFunc
    nsSkinEngine::NSISOnControlBindNSISScript "CancelUpdateBtn" $0
   ${EndIf}
   
   nsSkinEngine::NSISFindControl "OkUpdateBtn"
   Pop $0
   ${If} $0 == "${NOFIND}"
    MessageBox MB_OK "Do not have OkUpdateBtn"
   ${Else}
    GetFunctionAddress $0 DoUpdateFunc
    nsSkinEngine::NSISOnControlBindNSISScript "OkUpdateBtn" $0
   ${EndIf}
   ;第四页面
   nsSkinEngine::NSISFindControl "CancelReplaceBtn"
   Pop $0
   ${If} $0 == "${NOFIND}"
    MessageBox MB_OK "Do not have CancelReplaceBtn"
   ${Else}
    GetFunctionAddress $0 OnCancelReplaceFunc
    nsSkinEngine::NSISOnControlBindNSISScript "CancelReplaceBtn" $0
   ${EndIf}
   
   nsSkinEngine::NSISFindControl "OkReplaceBtn"
   Pop $0
   ${If} $0 == "${NOFIND}"
    MessageBox MB_OK "Do not have OkReplaceBtn"
   ${Else}
    GetFunctionAddress $0 DoReplaceFunc
    nsSkinEngine::NSISOnControlBindNSISScript "OkReplaceBtn" $0
   ${EndIf}
   ;第五页面
   nsSkinEngine::NSISFindControl "CancelReplaceingBtn"
   Pop $0
   ${If} $0 == "${NOFIND}"
    MessageBox MB_OK "Do not have CancelReplaceingBtn"
   ${Else}
    GetFunctionAddress $0 OnInstallCancelFunc
    nsSkinEngine::NSISOnControlBindNSISScript "CancelReplaceingBtn" $0
   ${EndIf}
   ;第六页面
   nsSkinEngine::NSISFindControl "OkLatestVersionBtn"
   Pop $0
   ${If} $0 == "${NOFIND}"
    MessageBox MB_OK "Do not have OkLatestVersionBtn"
   ${Else}
    GetFunctionAddress $0 DoNoNeedUpdate
    nsSkinEngine::NSISOnControlBindNSISScript "OkLatestVersionBtn" $0
   ${EndIf}
   ;第七页面
   nsSkinEngine::NSISFindControl "CancelNetErrorBtn"
   Pop $0
   ${If} $0 == "${NOFIND}"
    MessageBox MB_OK "Do not have CancelNetErrorBtn"
   ${Else}
    GetFunctionAddress $0 OnInstallCancelFunc
    nsSkinEngine::NSISOnControlBindNSISScript "CancelNetErrorBtn" $0
   ${EndIf}
   
   nsSkinEngine::NSISFindControl "OkNetErrorBtn"
   Pop $0
   ${If} $0 == "${NOFIND}"
    MessageBox MB_OK "Do not have OkNetErrorBtn"
   ${Else}
    GetFunctionAddress $0 DoNetErrorFunc
    nsSkinEngine::NSISOnControlBindNSISScript "OkNetErrorBtn" $0
   ${EndIf}
   ;第八页面
    nsSkinEngine::NSISFindControl "OkSuccessedBtn"
   Pop $0
   ${If} $0 == "${NOFIND}"
    MessageBox MB_OK "Do not have OkSuccessedBtn"
   ${Else}
    GetFunctionAddress $0 DoSuccessedFunc
    nsSkinEngine::NSISOnControlBindNSISScript "OkSuccessedBtn" $0
   ${EndIf}
   
   ;升级过程出错
   nsSkinEngine::NSISFindControl "CancelUpdateErrorBtn"
   Pop $0
   ${If} $0 == "${NOFIND}"
    MessageBox MB_OK "Do not have CancelUpdateErrorBtn"
   ${Else}
    GetFunctionAddress $0 OnInstallCancelFunc
    nsSkinEngine::NSISOnControlBindNSISScript "CancelUpdateErrorBtn" $0
   ${EndIf}
   
   nsSkinEngine::NSISFindControl "OkUpdateErrorBtn"
   Pop $0
   ${If} $0 == "${NOFIND}"
    MessageBox MB_OK "Do not have OkUpdateErrorBtn"
   ${Else}
    GetFunctionAddress $0 DoNetErrorFunc
    nsSkinEngine::NSISOnControlBindNSISScript "OkUpdateErrorBtn" $0
   ${EndIf}
   
   GetFunctionAddress $varShowInstTimerId InitUpdate
   nsSkinEngine::NSISCreatTimer $varShowInstTimerId 1
   Call InstallProgressExt
   nsSkinEngine::NSISRunSkinEngine "false"
FunctionEnd

Function InitUpdate
    nsSkinEngine::NSISKillTimer $varShowInstTimerId
    Call CheckUpdateMark
    ${GetParameters} $varCurrentParameters # 获得命令行
    ;MessageBox MB_OK "$varCurrentParameters"
    ClearErrors
    ${GetParameters} $R0 # 获得命令行
    ${GetOptions} $R0 "/UpdateVersion" $R1 # 在命令行里查找是否存在/T选项
    IfErrors 0 +4
    Call getUpdateTempVersion
    StrCpy $varCurrentVersion $varUpdateTempVersion
    Goto +2
    StrCpy $varCurrentVersion "$R1"
    ClearErrors
    ${GetParameters} $R0 # 获得命令行
    ${GetOptions} $R0 "/Auto" $R1 # 在命令行里查找是否存在/T选项
    IfErrors 0 +3
    StrCpy $IsAuto "0"
    Goto +2
    StrCpy $IsAuto "1"
    ClearErrors
    ${GetParameters} $R0 # 获得命令行
    ${GetOptions} $R0 "/Backstage" $R1 # 在命令行里查找是否存在/T选项
    IfErrors 0 +3
    StrCpy $IsBackstage "0"
    Goto +2
    StrCpy $IsBackstage "1"
    ClearErrors
    ${GetParameters} $R0 # 获得命令行
    ${GetOptions} $R0 "/BanDisturb" $R1 # 在命令行里查找是否存在/T选项
    IfErrors 0 +3
    StrCpy $IsBanDisturb "0"
    Goto +2
    StrCpy $IsBanDisturb "1"
    ClearErrors
    ${GetOptions} $R0 "/UpdateSelf" $R1 # 在命令行里查找是否存在/T选项
    IfErrors 0 +3
    StrCpy $IsUpdateSelf "0"
    Goto +3
    StrCpy $IsUpdateSelf "1"
    KillProcDLL::KillProc "${UPDATE_NAME}"
    ClearErrors
    ${GetParameters} $R0 # 获得命令行
    ${GetOptions} $R0 "/UpdateOther" $R1 # 在命令行里查找是否存在/T选项
    IfErrors 0 +3
    StrCpy $IsUpdateOther "0"
    Goto +4
    StrCpy $IsUpdateOther "1"
    nsSkinEngine::NSISSetTabLayoutCurrentIndex "WizardTab" "${STEP_REPLACE_FILES}"
    nsSkinEngine::NSISSetTabLayoutCurrentIndex "BottomWizardTab" "${STEP_REPLACE_FILES}"
    Call getLocalVersion
    nsSkinEngine::NSISSetControlData "currentVersionTextStep1"  "当前版本：$varLocalVersion"  "text"
    ClearErrors
    ${GetParameters} $R0 # 获得命令行
    ${GetOptions} $R0 "/AutoDown" $R1 # 在命令行里查找是否存在/T选项
    IfErrors 0 +3
    StrCpy $IsAutoDown "0"
    Goto +2
    StrCpy $IsAutoDown "1"
    ClearErrors
    ${GetParameters} $R0 # 获得命令行
    ${GetOptions} $R0 "/RunAs" $R1 # 在命令行里查找是否存在/T选项
    IfErrors 0 +3
    StrCpy $IsRunAs "0"
    Goto +2
    StrCpy $IsRunAs "1"
    ;处理mutex
    nsUtils::NSISCreateMutex "${PRODUCT_NAME_EN}AutoUpdate"
    Pop $R0
    ${If} $R0 == 1
		${If} $IsRunAs == "0"
			${If} $IsAuto == "0"
				nsSkinEngine::NSISMessageBox ${MB_OK} "" "有一个升级已经运行！"
			${EndIf}
			nsSkinEngine::NSISExitSkinEngine "false"
		${EndIf}
	${EndIf}
    ${If} $IsAuto == 0
    nsSkinEngine::NSISShowSkinEngine
    ${ElseIf} $IsAuto == 1
    ${AndIf} $IsUpdateSelf == 1
    ${AndIf} $IsBackstage == 0
    nsSkinEngine::NSISShowLowerRight
    ${EndIf}
    nsAutoUpdate::SetAppServerSettings "${PRODUCT_UPDATE_ID}" "65B70DE7540C42759156483165E35215" "${PRODUCT_UPDATE_ADDRESS}"
    ${If} $IsUpdateSelf == 0
    nsAutoUpdate::InitLog "false"
    ${Else}
    nsAutoUpdate::InitLog "true"
    ${EndIf}
    nsAutoUpdate::SetAppSettings "${UPDATE_NAME}" "$EXEDIR" "${PRODUCT_NAME_EN}" "${PRODUCT_UPDATE_KEY}"
    GetFunctionAddress $0 UpdateEventChangeCallback 
    nsAutoUpdate::SetUpdateEventChangeCallback $0
    GetFunctionAddress $0 ProgressChangeCallback 
    nsAutoUpdate::SetProgressChangeCallback $0
    ${If} $IsHasUpdateMark == 1
        nsSkinEngine::NSISSetTabLayoutCurrentIndex "WizardTab" "${STEP_REPLACE_FILES}"
        nsSkinEngine::NSISSetTabLayoutCurrentIndex "BottomWizardTab" "${STEP_REPLACE_FILES}"
        nsSkinEngine::NSISShowSkinEngine
        GetFunctionAddress $0 ReplaceFiles
        BgWorker::CallAndWait
    ${Else}
        ${If} $IsUpdateOther == 0
        nsAutoUpdate::SetLocalVersion "$varLocalVersion"
        nsAutoUpdate::RequestUpdateInfo
        ${EndIf}
        ${If} $IsUpdateSelf == 1
        nsAutoUpdate::ReplaceUzipDirFileToCurrentDir "${UPDATE_NAME}" "${UPDATE_NAME}"
        ${EndIf}
        ${If} $IsUpdateOther == 1
        GetFunctionAddress $0 ReplaceOtherFiles
        BgWorker::CallAndWait
        ${EndIf}
    ${EndIf}
FunctionEnd

Function OnInstallMinFunc
    nsSkinEngine::NSISMinSkinEngine
FunctionEnd

Function ReplaceFiles
    nsProcess::FindProcessByName "${MAIN_APP_NAME}"
    Pop $R1
    ${If} $R1 == 0
    nsSkinEngine::NSISSetTabLayoutCurrentIndex "WizardTab" "${STEP_FILES_DOWNLOADED}"
    nsSkinEngine::NSISSetTabLayoutCurrentIndex "BottomWizardTab" "${STEP_FILES_DOWNLOADED}"
    ${Else}
    nsAutoUpdate::ReplaceFiles
    ${Endif}
FunctionEnd

Function ReplaceOtherFiles
   nsAutoUpdate::ReplaceOtherFiles
FunctionEnd

Function getLocalVersion
   ClearErrors
   ReadRegStr $varLocalVersion HKCU "${PRODUCT_REG_KEY}" "UpdateVersion"
   IfErrors 0 +2
   ReadRegStr $varLocalVersion HKCU "${PRODUCT_REG_KEY}" "ProductVersion"
   ;
FunctionEnd

Function getUpdateTempVersion
   ClearErrors
   ReadRegStr $varUpdateTempVersion HKCU "${PRODUCT_REG_KEY}" "UpdateTempVersion"
FunctionEnd

Function WriteUpdateMark
    WriteRegStr HKCU "${PRODUCT_REG_KEY}" "UpdateTempVersion" "$varCurrentVersion"
    WriteRegStr HKCU "${PRODUCT_REG_KEY}" "ReplaceTag" "1"
FunctionEnd

Function removeUpdateMark
    DeleteRegValue HKCU "${PRODUCT_REG_KEY}" "ReplaceTag"
    DeleteRegValue HKCU "${PRODUCT_REG_KEY}" "UpdateTempVersion"
FunctionEnd

Function CheckUpdateMark
    ClearErrors
    ReadRegStr $IsHasUpdateMark HKCU "${PRODUCT_REG_KEY}" "ReplaceTag"
    IfErrors 0 +2
    StrCpy $IsHasUpdateMark "0"
    ;
FunctionEnd

Function ProgressChangeCallback
    Pop $R1
    Pop $R2
    Pop $R3
    nsSkinEngine::NSISSetControlData "progressText"  "$R1%"  "text"
    nsSkinEngine::NSISSetControlData "InstallProgressBar"  "$R1"  "ProgressInt"
    nsSkinEngine::NSISSetControlData "InstallProgressBar"  "$R1" "TaskBarProgress"
    nsSkinEngine::NSISSetControlData "progressTip"  "正在下载：$R2"  "text"
    DetailPrint '进度：$R1  下载文件名：$R2  是否完成：$R3'
FunctionEnd

Function UpdateEventChangeCallback
    Pop $varCurrentStep
    ${If} $varCurrentStep == '${EVENT_CHECK_UPDATE}'
    DetailPrint '检查更新'
    ${ElseIf} $varCurrentStep == '${EVENT_CHECK_UPDATE_SUCCESS}'
    DetailPrint '检查更新成功'
    ${ElseIf} $varCurrentStep == '${EVENT_INIT_LOG_SUCCESS}'
    DetailPrint '初始化log成功'

    ${ElseIf} $varCurrentStep == '${EVENT_UPDATE_EFFECTIVE}'
    DetailPrint '升级有效'
    ${ElseIf} $varCurrentStep == '${EVENT_UPDATE_NO_EFFECTIVE}'
    DetailPrint '升级无效'
    Call NoNeedUpdate
    Call NoNeedUpdateStepExt
    ${ElseIf} $varCurrentStep == '${EVENT_UPDATE_NEED}'
    DetailPrint '需要更新'
        Call NeedUpdateStepExt
        nsSkinEngine::NSISSetTabLayoutCurrentIndex "WizardTab" "${STEP_SHOW_UPDATE_INFO}"
        nsSkinEngine::NSISSetTabLayoutCurrentIndex "BottomWizardTab" "${STEP_SHOW_UPDATE_INFO}"
        nsAutoUpdate::CurrentVersion
        Pop $varCurrentVersion
        DetailPrint '可升版本:$varCurrentVersion'
        nsSkinEngine::NSISSetControlData "newVersionTextStep2"  "可升版本：$varCurrentVersion"  "text"
        nsAutoUpdate::UpdateInfo
        Pop $R0
        DetailPrint '升级信息:$R0'
        nsSkinEngine::NSISSetControlData "updateInfo"  $R0  "text"
        nsAutoUpdate::IsBackstage
        Pop $IsBackstage
        ${If} $IsBackstage == 1
         StrCpy $varCurrentParameters "$varCurrentParameters /Backstage"
        ${EndIf}
        DetailPrint '是否后台:$R0'
        nsAutoUpdate::IsManual
        Pop $IsManual
        DetailPrint '是否手动:$R0'
        nsAutoUpdate::IsForced
        Pop $IsForced
        DetailPrint '是否强制:$R0'
        ${If} $IsAuto == 1
            ${If} $IsBanDisturb == 1
            ${AndIf} $IsForced != 1
            ${OrIf} $IsManual == 1
                nsSkinEngine::NSISExitSkinEngine "false"
            ${ElseIf} $IsBackstage == 1
                nsAutoUpdate::DownloadUpdateFileListIni
            ${ElseIf} $IsBackstage == 0
                nsSkinEngine::NSISShowLowerRight
            ${EndIf}
        ${EndIf}
        ${If} $IsAutoDown == 1
            nsSkinEngine::NSISSetTabLayoutCurrentIndex "WizardTab" "${STEP_DOWNLOAD_FILES}"
            nsSkinEngine::NSISSetTabLayoutCurrentIndex "BottomWizardTab" "${STEP_DOWNLOAD_FILES}"
            nsSkinEngine::NSISSetControlData "newVersionTextStep3"  "升级版本：$varCurrentVersion"  "text"
            nsAutoUpdate::DownloadUpdateFileListIni
        ${EndIf}
    ${ElseIf} $varCurrentStep == '${EVENT_UPDATE_NO_NEED}'
     Call NoNeedUpdate
     Call NoNeedUpdateStepExt
    DetailPrint '不需要更新'
    ${ElseIf} $varCurrentStep == '${EVENT_DOWNLOAD_FILELIST}'
    Call DownloadUpdateStepExt
    DetailPrint '下载filelist.ini'
    ${ElseIf} $varCurrentStep == '${EVENT_DOWNLOAD_FILELIST_SUCCESS}'
    DetailPrint '下载filelist.ini成功'
    IfFileExists $EXEDIR\$varCurrentVersion\* 0 +2
    Goto +3
    CreateDirectory $EXEDIR\$varCurrentVersion
    CopyFiles /SILENT $EXEDIR\$varLocalVersion\*.* $EXEDIR\$varCurrentVersion
    nsAutoUpdate::DownloadNeedUpdateFiles
    ${ElseIf} $varCurrentStep == '${EVENT_COMPARE_FILES}'
    DetailPrint '比对文件'
    ${ElseIf} $varCurrentStep == '${EVENT_COMPARE_FILES_SUCCESS}'
    DetailPrint '比对文件成功'
    ${ElseIf} $varCurrentStep == '${EVENT_DOWNLOAD_FILES}'
    DetailPrint '下载文件'
    ${ElseIf} $varCurrentStep == '${EVENT_DOWNLOAD_FILES_SUCCESS}'
    DetailPrint '下载文件成功'
    nsAutoUpdate::UnzipNeedUpdateFiles
    ${ElseIf} $varCurrentStep == '${EVENT_UNZIP_FILES}'
    DetailPrint '解压文件'
    ${ElseIf} $varCurrentStep == '${EVENT_UNZIP_FILES_SUCCESS}'
    DetailPrint '解压文件成功'
    nsAutoUpdate::ReplaceFiles
    ${ElseIf} $varCurrentStep == '${EVENT_REPLACE_FILES}'
    DetailPrint '替换文件'
    Call removeUpdateMark
    nsSkinEngine::NSISSetTabLayoutCurrentIndex "WizardTab" "${STEP_REPLACE_FILES}"
    nsSkinEngine::NSISSetTabLayoutCurrentIndex "BottomWizardTab" "${STEP_REPLACE_FILES}"
    Call ReplaceFilesStepExt
    ${ElseIf} $varCurrentStep == '${EVENT_REPLACE_FILES_SUCCESS}'
    DetailPrint '替换文件成功'
    ${ElseIf} $varCurrentStep == '${EVENT_NEED_REPLACE_SELF_FILE}'
    DetailPrint '替换自身'
    nsAutoUpdate::ReplaceUzipDirFileToCurrentDir "${UPDATE_NAME}" "${UPDATE_TEMP_NAME}"
    Pop $R1
        ${If} $R1 == 1
        DetailPrint '运行${UPDATE_TEMP_NAME}'
        nsSkinEngine::NSISHideSkinEngine
        Exec '"$EXEDIR\${UPDATE_TEMP_NAME}" /UpdateSelf /UpdateOther $varCurrentParameters /UpdateVersion $varCurrentVersion'
        nsSkinEngine::NSISExitSkinEngine "false"
        ${Else}
            Call UpdateError
        ${EndIf}
    ${ElseIf} $varCurrentStep == '${EVENT_UPDATE_SUCCESS}'
    DetailPrint '升级成功'
        Call createOldVersion
        WriteRegStr HKCU "${PRODUCT_REG_KEY}" "UpdateVersion" "$varCurrentVersion"
        IfFileExists "$EXEDIR\UpdatePatch.exe" 0 +1
        Exec '"$EXEDIR\UpdatePatch.exe"'
        ${If} $IsAuto == 1
        ${AndIf} $IsBackstage == 1
        nsSkinEngine::NSISExitSkinEngine "false"
        ${Else}
        Call getLocalVersion
        nsSkinEngine::NSISSetControlData "currentVersionTextStep4"  "当前版本：$varLocalVersion"  "text"
        nsSkinEngine::NSISSetTabLayoutCurrentIndex "WizardTab" "${STEP_UPDATE_SUCCESS}"
        nsSkinEngine::NSISSetTabLayoutCurrentIndex "BottomWizardTab" "${STEP_UPDATE_SUCCESS}"
        Call UpdateSuccessStepExt
        ${EndIf}
        Call RefreshShellIcons
    ${ElseIf} $varCurrentStep > '${EVENT_UPDATE_SUCCESS}' ;EVENT_SOME_ERROR
    DetailPrint "出错了 代号：$varCurrentStep"
        ${If} $varCurrentStep == '${EVENT_INIT_DIR_ERROR}'
        DetailPrint "需要提升权限"
        nsAutoUpdate::RunAsProcessByFilePath "$EXEPATH" "/RunsAs /AutoDown $varCurrentParameters"
        Pop $R0
            ${If} $R0 == 0
                Call UpdateError
            ${Else}
                nsSkinEngine::NSISExitSkinEngine "false"
            ${EndIf}
        ${ElseIf} $varCurrentStep == '${EVENT_CHECK_UPDATE_ERROR}'
         Call NetError
         Call NetErrorStepExt
        ${Else}
         Call UpdateError
         Call UpdateErrorStepExt
        ${EndIf}
    ${EndIf}
FunctionEnd

Function NoNeedUpdate
    ${If} $IsAuto == 0    
        nsSkinEngine::NSISSetTabLayoutCurrentIndex "WizardTab" "${STEP_NO_NEED}"
        nsSkinEngine::NSISSetTabLayoutCurrentIndex "BottomWizardTab" "${STEP_NO_NEED}"
        nsSkinEngine::NSISSetControlData "currentVersionTextStep5"  "当前版本：$varLocalVersion"  "text"
    ${Else}
        nsSkinEngine::NSISExitSkinEngine "false"
    ${EndIf}
FunctionEnd

Function NetError
    ${If} $IsAuto == 0 
        nsSkinEngine::NSISSetTabLayoutCurrentIndex "WizardTab" "${STEP_NET_ERROR}"
        nsSkinEngine::NSISSetTabLayoutCurrentIndex "BottomWizardTab" "${STEP_NET_ERROR}"
    ${Else}
        nsSkinEngine::NSISExitSkinEngine "false"
    ${EndIf}
FunctionEnd

Function UpdateError
    ${If} $IsBackstage == 0 
        nsSkinEngine::NSISSetTabLayoutCurrentIndex "WizardTab" "${STEP_UPDATE_ERROR}"
        nsSkinEngine::NSISSetTabLayoutCurrentIndex "BottomWizardTab" "${STEP_UPDATE_ERROR}"
    ${Else}
        nsSkinEngine::NSISExitSkinEngine "false"
    ${EndIf}
FunctionEnd

Function DoUpdateFunc
    nsSkinEngine::NSISSetTabLayoutCurrentIndex "WizardTab" "${STEP_DOWNLOAD_FILES}"
    nsSkinEngine::NSISSetTabLayoutCurrentIndex "BottomWizardTab" "${STEP_DOWNLOAD_FILES}"
    nsSkinEngine::NSISSetControlData "newVersionTextStep3"  "升级版本：$varCurrentVersion"  "text"
    nsAutoUpdate::DownloadUpdateFileListIni
FunctionEnd

Function DoReplaceFunc
	Push $varCurrentVersion
    Call KillAllProcess
    nsAutoUpdate::ReplaceFiles
FunctionEnd

Function DoNoNeedUpdate
    nsSkinEngine::NSISExitSkinEngine "false"
FunctionEnd

Function DoNetErrorFunc
    nsSkinEngine::NSISSetTabLayoutCurrentIndex "WizardTab" "${STEP_CHECK_UPDATE}"
    nsSkinEngine::NSISSetTabLayoutCurrentIndex "BottomWizardTab" "${STEP_CHECK_UPDATE}"
    nsAutoUpdate::RequestUpdateInfo
FunctionEnd

Function DoSuccessedFunc
    nsSkinEngine::NSISHideSkinEngine
	ReadRegStr $R1 HKCU "${PRODUCT_REG_KEY}" "UpdateOldVersion"
	Push $R1
    Call KillAllProcess
    Exec '"$EXEDIR\${MAIN_LAUNCHAPP_NAME}" /SetForeground'
    IfFileExists "$EXEDIR\update\*" 0 +1
    RMDir /r /REBOOTOK "$EXEDIR\update"
	ClearErrors
	ReadRegStr $R0 HKCU "${PRODUCT_REG_KEY}" "UpdateOldVersion"
	IfErrors 0 +2
	Goto +5
	${If} $R0 != ""
	IfFileExists $EXEDIR\$R0\* 0 +2
	RMDir /r /REBOOTOK "$EXEDIR\$R0"
	${EndIf}
	IfFileExists $EXEDIR\$R0\* 0 +2
	Goto +2
	DeleteRegValue HKCU "${PRODUCT_REG_KEY}" "UpdateOldVersion"
	;
    ${If} ${PRODUCT_SUPPORT_STATISTICS} == 1
        nsStatistics::InitCommonStatistics
        nsStatistics::AddOneAttribute "step" "3"
        nsStatistics::AddOneAttribute "currentversion" "${PRODUCT_VERSION}"
        nsStatistics::AddOneAttribute "channelid" "1"
        nsStatistics::SendStatisticsInfo "${PRODUCT_STATISTICS_ADDRESS}" "65B70DE7540C42759156483165E35215" "${PRODUCT_UPDATE_ID}"
    ${EndIf} 
    nsSkinEngine::NSISExitSkinEngine "false"
FunctionEnd

Function OnCancelReplaceFunc
    nsSkinEngine::NSISMessageBox ${MB_OKCANCEL} "" "更新进行中，确认取消？"
    Pop $0
    ${If} $0 == "1"
        Call WriteUpdateMark
        nsSkinEngine::NSISExitSkinEngine "false"
    ${EndIf}
FunctionEnd

Function OnInstallCancelFunc
    ${If} $varCurrentStep == '${EVENT_UPDATE_SUCCESS}'
    ${OrIf} $varCurrentStep == '${EVENT_UPDATE_NO_NEED}'
    ${OrIf} $varCurrentStep == '${EVENT_UPDATE_NO_EFFECTIVE}'
        nsSkinEngine::NSISExitSkinEngine "false"
    ${Else}
        nsSkinEngine::NSISMessageBox ${MB_OKCANCEL} "" "更新进行中，确认取消？"
        Pop $0
        ${If} $0 == "${ON_OK}"
            nsSkinEngine::NSISExitSkinEngine "false"
        ${EndIf}
    ${EndIf}
FunctionEnd

Function createOldVersion
    Call getLocalVersion
    WriteRegStr HKCU "${PRODUCT_REG_KEY}" "UpdateOldVersion" "$varLocalVersion"
FunctionEnd

Section InstallFiles
SectionEnd

Function .onInstSuccess
FunctionEnd