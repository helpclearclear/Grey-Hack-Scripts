purple="<color=purple>"
red="<color=red>"
green="<color=green>"
orange="<color=orange>"
blue="<color=blue>"
white="<color=white>"
NEW={}
NEW.key=function(map, key)
  map[key]=""
end function
NEW.value=function(map, key, value)
  //print(purple+"key: "+key)
  //print(purple+"value: "+value)
  map[key]=value
end function

pre={}
pre.search=function(originalStr=false, string=false)

	self.str=string
	self.fromStr=originalStr
	self.first=self.str[0]
	self.last=self.str[-2]
	self.length=self.str.len
	self.index1=self.fromStr.indexOf(self.first)
	self.index2=self.index1+self.length-1

	if self.index1 == null then return false
	for i in self.fromStr.values
		self.this=""
		if not self.fromStr.hasIndex(self.index2) then break
		for i in range(self.index1, self.index2)
			self.this=self.this+self.fromStr[i]
		end for

		if self.this != self.str then
			self.index1=self.index1+1
			self.index2=self.index2+1
			continue
		end if
		if self.this == self.str then
			self.check=true
			break
		end if
	end for
	if self.check == true then return true
	if self.check == false then return false
end function

pre.contains=function(str, val)
  if str.values.hasIndex(val) then return true
  return false
end function

pre.isStr=function(str)
  result=null
  if str.split("""").len > 2 and str[0] == " " then
    str=str.values[1:].join("")
    //print("THIS:"+str)
  end if
  if str.split("""").len > 2 and str.split("""")[0] == "" then
  //print("<color=red>"+str)
    //newStr=slice(str.values, str.values.indexOf(""""), str.values.indexOf(","));print("<color=red>FIRST")
    //if typeof(newStr) == "null" then newStr=slice(str.values, str.values.indexOf(""""), str.values.indexOf("\n")-1);print("<color=red>SECOND")
    ind1=0
    ind2=0

    lister=str.values
    if lister[0] == """" then
      lister.remove(0)
      ind2=lister.indexOf("""")+2
      if ind2 != 0 then newStr=slice(str.values, ind1, ind2) else newStr=null
      //print(newStr.join(""))
      result=newStr[1:-1].join("")
      //print("<color=white>"+result)
    end if
  end if

  return result
  //print("<color=red>"+result+" : "+typeof(result))
end function

pre.isNum=function(str)
  result=null
  if str[0] == " " then
    str=str.values[1:].join("")
    print("THIS:"+str)
  end if
  if typeof(slice(str.values, 0, str.values.indexOf("}")-1).join("").to_int) == "number" then result=slice(str.values, 0, str.values.indexOf("}")-1).join("").to_int
  if str.split(",").len > 1 then
    //print(blue+str)
    if typeof(str.split(",")[0].to_int) == "number" then
    result=str.split(",")[0].to_int

    end if
  end if

  return result
end function

pre.isList=function(str)
  result=null
  ind1=0
  temp=str.values
  self.list=[]
  initialList=false

    if temp.indexOf("*") == null or temp[0] != "[" then return null
    for i in temp
      //if i  == "]" then print(purple+i)
      if temp.hasIndex(temp.indexOf(i)+1) then
        if (i == "]" and temp.hasIndex("*") and temp[temp.indexOf(i)+1] == "*") then
          ind1=temp.indexOf(i)+1
          //print(red+temp[ind1])
          //ind1=temp.indexOf(i)+1
          //print(red+ind1)
          break
        end if
        if (i == "]" and temp.hasIndex("*") and not temp[temp.indexOf(i)+1] == "*") then temp.remove(temp.indexOf(i))
      end if
    end for

    if temp.hasIndex("*") then
      for i in temp
        //if i  == "]" then print(purple+i)
        if temp.hasIndex(temp.indexOf(i)+1) then
          if (i == "]" and temp.hasIndex("*") and temp[temp.indexOf(i)+1] == "*") then
            ind1=temp.indexOf(i)+1
            //print(red+temp[ind1])
            //ind1=temp.indexOf(i)+1
            //print(red+ind1)
            break
          end if
        end if
      end for
    end if

    initialList=slice(temp, temp.indexOf("["), ind1)
    //if initialList == false then initialList=LIST

  print(initialList)
  if initialList != null then
    print(blue+initialList.join(""))
    initialList=initialList.join("").split(",")
    self.toggle=false
    count=-1
    for str in initialList
      count=count+1
      if str.values.indexOf("[") != null and str.values.len == 3 then
        //print(white+str.values)
        print(white+"SUCCESS: "+str.values)
        strSample=slice(initialList, count, -1)
        print(purple+strSample.join(","))
        //print(initialList[0].values[0])
        //self.list.push(pre.isList(strSample.join(",")))
        // pre.isList(initialList.join(""), initialList[:initialList.indexOf("[")-1], 2)
        //work on recursion
      else if str.values.indexOf("[") != null and str.values.len == 2 then
        str=str.values[1:].join("")
        print(white+"FAILED: "+str.values)
      end if

      print(white+"EXPER: "+str.values)
      if str.values[-1] == "]" then
        index1=str.values.indexOf(" ")
        index2=str.values.indexOf("]")
        l=[typeof(index1),typeof(index2)]
        if l == ["null", "number"] then str=str.values[:-1].join("")
        if l == ["number", "number"] then str=str.values[1:-1].join("")
        self.toggle=true
        //ending
      end if
      if str.hasIndex("""") then print(purple+str)
      if str.hasIndex("""") and pre.isStr(str) != null then self.list.push(pre.isStr(str))
      if str.split(".").len == 2 and typeof((str.split(".")[0]+str.split(".")[1]).to_int) == "number" and pre.isNum(str.split(".")[0]) != null then self.list.push(pre.isNum(str.split(".")[0]))
      if typeof(str.to_int) == "number" and pre.isNum(str) != null then self.list.push(pre.isNum(str))
      //typeof((str.split(".")[0]+str.split(".")[1]).to_int) == "number"
      //print(str)
      //if pre.isStr(str) != null then self.list.push(pre.isStr(str))
      //if pre.isNum(str) != null then self.list.push(pre.isNum(str))
      //if pre.isNum
      if self.toggle==true then break
    end for
    print(red+self.list)
  end if
  result=self.list
  return result
end function

json={}
json.write=function(map=false)
	desc="<color=purple><b>json.write: this function takes any map object and parses it into a string in JSON format. does not support maps objects containing functions."
	if map == "help" then exit(desc)

	self["8wkAhdTjwmzb8Tugmpgs"]="STOP"

	if typeof(map) != "map" then return {status:"error", msg:"inputed object is not a map."}

	self.trans=function(map, int=2, int2=2, recursive=false)
		self.stop=false
		self.str="{"
		d=""""
		self.indent=int
		self.brackets=int2
		index=map.indexes
		for i in index
			self.type=typeof(map[i])
			if self.type != "number" and self.type != "list" and self.type != "string" and self.type != "null" and self.type != "map" then continue
			if self.type=="number" then
				self.str=self.str+char(10)+" "*self.indent+d+i+d+": "+map[i]
				if index.hasIndex(index.indexOf(i)+1) then self.str=self.str+","
			end if
			if self.type=="list" then
				self.str=self.str+char(10)+" "*self.indent+d+i+d+": ["
				for item in map[i]
					if not map[i].hasIndex(map[i].indexOf(item)+1) then
						if typeof(item) =="string" then self.str=self.str+d+item+d+"]" else self.str=self.str+item+"]*"
					else
						if typeof(item) =="string" then self.str=self.str+d+item+d+", " else self.str=self.str+item+","
					end if
				end for
				if index.hasIndex(index.indexOf(i)+1) then self.str=self.str+","
			end if
			if self.type=="string" then
				self.str=self.str+char(10)+" "*self.indent+d+i+d+": "+d+map[i]+d
				if index.hasIndex(index.indexOf(i)+1) then self.str=self.str+","
			end if
			if self.type=="null" then
				self.str=self.str+char(10)+" "*self.indent+d+i+d+": null"
				if index.hasIndex(index.indexOf(i)+1) then self.str=self.str+","
			end if
			if self.type=="map" then
				self.brackets=self.brackets+2
				self.str=self.str+char(10)+" "*self.indent+d+i+d+": "
				if map[i].indexOf("8wkAhdTjwmzb8Tugmpgs") == null or map["8wkAhdTjwmzb8Tugmpgs"] != "STOP" then self.str=self.str+self.trans(map[i], self.indent+2, self.brackets, true)
				if index.hasIndex(index.indexOf(i)+1) then
					self.str=self.str//+","
					self.indent=self.indent-4
				end if
			end if

			if not index.hasIndex(index.indexOf(i)+1) and recursive==true then self.brackets=self.brackets-2
			if not index.hasIndex(index.indexOf(i)+1) and recursive==true then self.str=self.str+char(10)+" "*self.brackets+"}"
			if not index.hasIndex(index.indexOf(i)+1) and recursive==false then self.str=self.str+char(10)+"}"+char(10)+"--END--"
		end for
		return self.str
	end function
	return self.trans(map)
end function

json.read=function(string)
  self.str=string
  if pre.search(self.str, "--END--") == true and not self.str.split("--END--") > 1 then self.str=self.str.split("--END--")[0] else return {"<color=red>status":"error", "msg":"must parse --END-- to run through json.read"}
  self.strList=self.str.split(""": ")
	//print(self.strList)
	//print(self.str)
  self.map={}
  self.mainKey=""
  self.determineKey=function(str)
    result=false
    //print("<color=red>"+str+"\n\n")
    if str.split("""").len == 1 then return false
    print(green+str+"\n"+orange+self.mainKey)
    if pre.contains(str, "{") == true and pre.contains(str, """") == true then
      //this grabs the first key in every map and submap
      if str.split("""").len == 2 and not self.map.hasIndex(str.split("""")[1]) then NEW.key(self.map, str.split("""")[1]); self.mainKey=str.split("""")[1]
      result=true
    end if
    if str.split("""").len == 2 and self.map.hasIndex(str.split("""")[1]) then NEW.key(self.map, str.split("""")[1]); self.mainKey=str.split("""")[1]; result=true//print(green+str) //else print("FAILED: "+str)

    if str.split(",").len == 2 or str.split("],").len == 2 or str.split("},").len == 2 then
      //This grabs keys that are under eachother
      if str.split(",").len == 2 then
        if str.split(",")[1].split("""").len == 2 then NEW.key(self.map, str.split(",")[1].split("""")[1]); self.mainKey=str.split(",")[1].split("""")[1]
        result=true

      end if

      if str.split("],").len == 2 then
        if str.split("],")[1].split("""").len == 2 then NEW.key(self.map, str.split("],")[1].split("""")[1]); self.mainKey=str.split("],")[1].split("""")[1]
        result=true
      end if

      if str.split("},").len == 2 then
        if str.split(",")[1].split("""").len == 2 then NEW.key(self.map, str.split("},")[1].split("""")[1]); self.mainKey=str.split("},")[1].split("""")[1]
        result=true
      end if
    end if

    return result
  end function

  for str in self.strList
    //print(str.split(""""))
    //print(blue+pre.isStr(str)+" : "+typeof(pre.isStr(str)))

    if pre.isStr(str) != null then
      NEW.value(self.map, self.mainKey, pre.isStr(str))
    end if

    if pre.isNum(str) != null then
      NEW.value(self.map, self.mainKey, pre.isNum(str))
    end if

    //print(typeof(pre.isList(str)))
    if pre.isList(str) != null then
      NEW.value(self.map, self.mainKey, pre.isList(str))
    end if
    //if self.determineKey(str) == true then continue
    self.determineKey(str)
    //print("key: "+self.mainKey)
    //print(str)
  end for

  print("\n")
  print(self.map)
  print("\n")
  print(self.strList)
end function

str=json.write({"str":"this is a string", "str2":"this is a short-stop string", "number":1234, "list":[1,2,3,"substring","4",5], "longList":range(1,20), "submap":{"first":{}, "num":1234, "sublist":[1,2,3,4,5,6]}, "newStr":"this is the second string", "numberr":9218374, "list2":[1,2,"3",[1,2, [3,4,5]]]})
json.read(str)
