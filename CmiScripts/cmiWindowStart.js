  var myCmiWindow;
  var statusText;
  var cmiCanvas;
  var toolTip;

  function cmiWindowStart()
  {

    statusText = document.getElementById("StatusText");
    cmiCanvas = document.getElementById("CmiCanvas");
    toolTip = document.getElementById("ToolTippText");

    myCmiWindow = new CmiWindow("CmiCanvas");
    if(myCmiWindow.isUsable)
    {
      if(myCmiWindow.checkWebGlUsage() < 0)
      {
        SetStatusText(myCmiWindow.getLastError().message);
        return;
      }
      myCmiWindow.setBgColorRGB(255,255,255);
      myCmiWindow.setBgText("");
      myCmiWindow.colGradient =false;
      if(myCmiWindow.initWebGlWindow() < 0)
      {
        SetStatusText(myCmiWindow.getLastError().message);
        return;
      }

      myCmiWindow.useFrontAsTop = true;
      myCmiWindow.setNotificationHandler(OnCmiNotification);
      myCmiWindow.handleArrowKeys = false;
      myCmiWindow.loadModelFromUrl("NoName.wpm");
      myCmiWindow.switchToPerspective(true);
      myCmiWindow.setMouseModeToRotation();
    }
  }

  function SetStatusText(newText)
  {
    statusText.innerHTML = newText;
  }

  function OnCmiNotification (event)
  {
    var txtParts = event.data.split("|");
    if(txtParts[0]=="CMI_ERROR")
    {
      SetStatusText(txtParts[2]);
    }
    else if(txtParts[0]=="CMI_INFO")
    {
      switch(txtParts[1])
      {
        case "ModelLoading":
          SetStatusText(txtParts[2]);
          break;
        case "ModelOpened":
          SetStatusText("");
          break;
        case "ModelDisplayed":
          if ((!myCmiWindow) || (!myCmiWindow.isUsable))
            return;
          myCmiWindow.rotateSceneAbsolut(0, 0, 0, true);
          myCmiWindow.zoomAll();
          break;
        case "EntitySelectionHighlight":
          if(toolTip)
          {
            toolTip.style.left = (parseInt(txtParts[2])+10)+"px";
            toolTip.style.top = (parseInt(txtParts[3])-20)+"px";
            toolTip.innerHTML = "&nbsp;" + txtParts[5] +"&nbsp;";
            toolTip.style.display = "block";
            cmiCanvas.style.cursor = "grab";
          }
          break;
        case "EntityUrlSelectionHighlight":
          if(toolTip)
          {
            toolTip.style.left = (parseInt(txtParts[2])+10) +"px";
            toolTip.style.top = (parseInt(txtParts[3])-20)+"px";
            toolTip.innerHTML = "&nbsp;" + txtParts[5] +"&nbsp;";
            toolTip.style.display = "block";
            cmiCanvas.style.cursor = "pointer";
          }
          break;
        case "EntitySelectionUnHighlight":
          if(toolTip)
          {
            toolTip.style.display = "none";
            cmiCanvas.style.cursor = "grab";
          }
          break;
        case "EntityUrlSelected":
          window.open (txtParts[4],"mywindow");
          break;
      }
    }
  }