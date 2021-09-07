//{"status":"error", "msg":""}
//WRITTEN BY: Mr.Memberr#1353 on DISCORD
if program_path.split("/")[-1] != "formatKing.so" then get_shell.host_computer.File(program_path).rename("formatKing.so")
library={}
library.format={"type":"format"}
library.markup={"type":"markup"}
library.format["search"]=function(originalStr=false, string=false)
	self.check=false
	if not string or not originalStr then exit("<color=red>USAGE: from '"+library.format.type+"': search(insideThisString, lookFor)")
	if typeof(string) != "string" or typeof(originalStr) != "string" then return {"status":"error", "msg":"from '"+library.format.type+"': params must be strings..."}

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

library.format["startsWith"]=function(originalStr=false, string=false)
	self.check=false
	if not string or not originalStr then exit("<color=red>USAGE: from '"+library.format.type+"': startsWith(insideThisString, lookFor)")
	if typeof(string) != "string" or typeof(originalStr) != "string" then return {"status":"error", "msg":"from '"+library.format.type+"': params must be strings..."}
	if string.len > originalStr.len then return false

	self.str=string
	self.fromStr=originalStr
	self.first=self.str[0]
	self.last=self.str[-2]
	self.length=self.str.len
	self.index1=0
	self.index2=self.index1+self.length-1

	for i in self.fromStr.values
		self.this=""
		for i in range(self.index1, self.index2)
			self.this=self.this+self.fromStr[i]
		end for

		if self.this != self.str then return false else return true
	end for

end function

library.format["endsWith"]=function(originalStr=false, string=false)
	self.check=false
	if not string or not originalStr then exit("<color=red>USAGE: from '"+library.format.type+"': endsWith(insideThisString, lookFor)")
	if typeof(string) != "string" or typeof(originalStr) != "string" then return {"status":"error", "msg":"from '"+library.format.type+"': params must be strings..."}
	if string.len > originalStr.len then return false

	self.str=string
	self.fromStr=originalStr
	self.first=self.str[0]
	self.last=self.str[-2]
	self.length=self.str.len-1
	self.index2=self.fromStr.len-1
	self.index1=self.index2-self.length

	for i in self.fromStr.values
		self.this=""
		for i in range(self.index1, self.index2)
			self.this=self.this+self.fromStr[i]
		end for

		if not self.str == self.this then return false
		if self.str == self.this then return true
	end for
end function

library.format["max"]=function(val=false)
	if val==false or typeof(val) != "list" then exit("<color=red>USAGE: from '"+library.format.type+"': max(list)")
	if val.len == 0 then return {"status":"error", "msg":"from '"+library.format.type+"': max(list): list is empty"}

	opt=false
	for i in val
		if typeof(i) != "number" then continue
		if i > opt then opt=i else continue
	end for
	return opt
end function

library.format["min"]=function(val=false)
	if val==false then exit("<color=red>USAGE: from '"+library.format.type+"': min(list)")
	if val.len == 0 then return {"status":"error", "msg":"from '"+library.format.type+"': min(list): list is empty"}

	opt=library.format.max(val)
	for i in val
		if typeof(i) != "number" then continue
		if i < opt then opt=i else continue
	end for
	return opt
end function

library.format.columns=function(string=false, x=false, y=false)
	if typeof(x) != "number" then return {"status":"error", "msg":"from '"+library.format.type+"': columns(str, x=false, y=false): [x:'"+x+"'] is not a valid input"}
	if typeof(y) != "number" then return {"status":"error", "msg":"from '"+library.format.type+"': columns(str, x=false, y=false): [y:'"+y+"'] is not a valid input"}
	x=" "*x
	y="\n"*y
	if string.split("\\n").len == 1 then return {"status":"error", "msg":"from '"+library.format.type+"': columns(str, x=false, y=false): rows must be seperated by new line"}
	cleanList=function(list)
		newList=[]
		for i in list
			if i == "" then continue
			newList.push(i)
		end for
		return newList
	end function

	self.str=string
	self.rows={}
	self.cols={}
	self.rows.list=cleanList(self.str.split("\\n"))
	self.cols.list=self.str.split(" ")
	self.rows.countX=self.rows.list.len
	self.cols.countX=self.rows.list[0].split(" ").len

	self.map={}
	self.map.cols={}
	self.map.rows={}
	for i in range(0, self.cols.countX-1)
		self.map.cols[str(i)]=[]
		for item in self.rows.list
			item=item.split(" ")
			self.map.cols[str(i)].push(item[i])
		end for

		self.cols.countY=self.map.cols["0"].len
	end for

	parseItemLen=function(string)

		str=string+"+"
		list=str.values
		indexes=[]
		instanceCount=0
		self.invert=false

		for i in list
			if i == "<" then
				indexes.push(list.indexOf(i))
				instanceCount=instanceCount+1
			end if
			if i == ">" then
				indexes.push(list.indexOf(i))
				instanceCount=instanceCount+1
			end if
		end for

		isEven=function(int)
			if typeof(int) != "number" then return char(0)
			Int=int
			Int=Int/2+""
			index=Int.values.indexOf(".")
			if typeof(index) == "null" then return true
			if typeof(index) == "number" then return false
		end function

		if indexes.len == 1 then return str.values[:-1].join("")
		test=[]
		for index in indexes
			ind1=indexes[indexes.indexOf(index)]
			ind2=list.indexOf("<")
			if list[-1] != ">" then ind2=-1
			if list[0] != "<" then self.invert=true
			if self.invert==true then
				//if there is markup AFTER the word, then this will catch and remove it
				ind1=list.indexOf("<")
				ind2=list.indexOf(">")
				if list[ind2] == ">" and list.hasIndex(ind2+1) then ind2=ind2+1
				a=slice(list, ind1, ind2)
				if a[-1]==">" then
					for i in range(0, a.len-1)
						list.remove(ind2-i)
					end for
				end if
				if a.indexOf(">")!=null and a.indexOf("<")!=null then result=parseItemLen(list[:-1].join("")) else result=list[:-1].join("")
				return result
			end if
			if list[ind2] == ">" and list.hasIndex(ind2+1) then ind2=ind2+1
			a=slice(list, list.indexOf(">")+1, ind2)
			if a.indexOf(">")!=null and a.indexOf("<")!=null then result=parseItemLen(a.join("")) else result=a.join("")
			return result
		end for
	end function



	self.leng={}
	self.leng2={}
	for i in range(0, self.map.cols.len-1)
		self.leng[str(i)]=0
		self.leng2[str(i)]=0
		self.head=self.map.cols[str(i)][0]
		self.head=parseItemLen(self.head)

		for item in self.map.cols[str(i)]
			itemLen=parseItemLen(item).len
			if self.head.len <= itemLen then
				if self.leng[str(i)] < itemLen then self.leng[str(i)]=itemLen
				if self.leng2[str(i)] < itemLen then self.leng2[str(i)]=itemLen
			end if
		end for
	end for

	for i in range(0, self.map.cols.len-1)
		self.head=self.map.cols[str(i)][0]
		self.head=parseItemLen(self.head)
		if self.leng[str(i)] == 0 then continue
		diff=(self.head.len-self.leng[str(i)])
		self.leng[str(i)]=diff
	end for
	indexes=range(0, self.map.cols.len-1)

	isPos=function(int)
		if int == 0 then return false
		return (str(int).split("-").len == 1)
	end function

	rotate=function(type)
		self.result=""
		self.headres=""
		self.resList=[]
		self.headresList=[]
		self.hedlist=[]
		self.itemList=[]
		self.stop=false
		self.lastIndexX=self.map.cols.len
		self.lastIndexY=self.rows.countX

		self.x=-1
		self.y=0
		self.c=0
		if type == "x" then
			while self.stop==false
				self.x=self.x+1
				self.c=self.c+1

				if self.x == self.lastIndexX then
					self.resList.push(self.result)
					self.result=""
					self.x=0
					self.y=self.y+1
				end if
				if self.y == self.lastIndexY then
					self.y=0
				end if

				self.HEADER=self.map.cols[str(self.x)][0]
				self.item=parseItemLen(self.map.cols[str(self.x)][self.y])
				self.diff=self.leng[str(self.x)]
				dd=false
				if self.y == 0 then
					stand=self.leng2[str(self.x)]+2
					ogDiff=(self.leng2[str(self.x)]-self.item.len)
					check=self.item.len+abs(ogDiff)
					if stand-check == 2 then dd=check
					if ogDiff == 0 then dd=2
					if ogDiff > 0 then dd=ogDiff+2
				end if
				if dd == false then
					stand=self.leng2[str(self.x)]+2
					ogDiff=(self.leng2[str(self.x)]-self.item.len)
					check=self.item.len+abs(ogDiff)
					if stand-check == 2 then dd=check
					if ogDiff == 0 then dd=2
					if ogDiff > 0 then dd=ogDiff+2
				end if

				notHeader=(self.y != 0)
				if (isPos(self.diff) == false and self.diff <= 0) then
					//This is for the item in the row is equal or greater than the length of the header
					//'x' is set at the beginning of the function
					if self.x == 0 then self.result=self.result+x+self.map.cols[str(self.x)][self.y]+" "*dd else self.result=self.result+self.map.cols[str(self.x)][self.y]+" "*dd
				end if

				if self.c == (self.rows.countX * self.map.cols.len) then
					self.resList.push(self.result)
					self.resList=cleanList(self.resList)
					self.stop=true
				end if
			end while
		end if
		if type == "x" then return self.resList
		return false
	end function

	self.conclusion=rotate("x")
	print(y)//'y' is set at the beginning of the function
	return self.conclusion.join("\n")
end function

library.format.read=function(file=false, letters=false, symbols=false)
	if [file, symbols, letters] == [0,0,0] then exit("<color=red>USAGE: from '"+library.format.type+"': read(file=false, letters=false, symbols=false)")

	if typeof(file) != "file" then return {"status":"error", "msg":"type is not a file"}
	if not file.has_permission("r") then return {"status":"error", "msg":"permission denied"}
	if file.get_content=="" then return ""

	if typeof(symbols) != "string" then symbols="<color=#979A9A>" else symbols="<color="+symbols+">"
	if typeof(letters) != "string" then letters="<color=white>" else letters="<color="+letters+">"

	self.content=file.get_content.split("\n")
	self.sym=symbols
	self.let=letters
	self.letList=["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
	self.toggle=false
	self.result=[]
	for line in self.content
		self.charList=line.values
		self.newCharList=[]
		for char in self.charList
			if self.letList.indexOf(char.lower) != null then
				self.newCharList.push(self.let+char)
				continue
			end if
			if self.letList.indexOf(char.lower) == null then
				self.newCharList.push(self.sym+char)
				continue
			end if
		end for
		self.line=self.newCharList.join("")
		self.result.push(self.line)
	end for

	return self.result.join("\n")
end function

//if [file,readOrWrite] == [0,0,0] then return "USAGE"
//if typeof(file) != "file" then return {}
library.format.json={}
library.format.json.write=function(map=false)
	self["8wkAhdTjwmzb8Tugmpgs"]="STOP"
	self.trans=function(map, int=2, int2=2, recursive=false)
		self.stop=false
		self.str="{"
		d="'"
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
						if typeof(item) =="string" then self.str=self.str+d+item+d+"]" else self.str=self.str+item+"]"
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
					self.str=self.str+","
					self.indent=self.indent-4
				end if
			end if

			if not index.hasIndex(index.indexOf(i)+1) and recursive==true then self.brackets=self.brackets-2
			if not index.hasIndex(index.indexOf(i)+1) and recursive==true then self.str=self.str+char(10)+" "*self.brackets+"}"
			if not index.hasIndex(index.indexOf(i)+1) and recursive==false then self.str=self.str+char(10)+"}"
		end for
		return self.str
	end function
	return self.trans(map)
end function

library.format.json.read=function(string)
	if typeof(string) != "string" then return {"status":"error", "msg":"from '"+library.format.type+"': json.read(file): type is not a string"}
	self.aTiU6ZgNnIEvkIfXrLgr="STOP"

	self.content=string
	self.trans=function(list, map, temp)
		m=map
		elev=list[0]
		key=list[1]
		value=list[2]
		if temp.len==0 then diff=0 else diff=((temp[-1])-(elev))
		temp.push(elev)
		if value == "{" then self.mapCheck=true else self.mapCheck=false
		if (diff==0) or self.mapCheck==false then
			m[key]=value
		end if
		//print(diff)
		return m
	end function


	toList=function(string)
		self.str=string
		self.stringOnly=false
		self.numOnly=false

		for i in self.str.values
			if typeof(i.to_int)=="number" and self.str.values.indexOf("'") != null then exit({"status":"error", "msg":"from '"+library.format.type+"': json.read(file): cannot parse '"+self.str+"'. contains mixed string and number types"})
			if typeof(i.to_int)=="number" then
				self.numOnly=true
			end if
			if typeof(i.to_int)=="string" then
				self.stringOnly=true
			end if
		end for

		if self.numOnly==true then
			list=self.str.split(",")
			re=[]
			for i in list
				if i.values.indexOf("[")!=null then i=i[1:]
				if i.values.indexOf("]")!=null then i=i[:-1]
				re.push(i.to_int)
			end for
			return re
		end if

		if self.stringOnly==true then
			self.multiInstance=false
			c=0
			for i in self.str.values
				if i=="," then c=c+1
			end for
			if c>1 then self.multiInstance=true

			if self.multiInstance==true then
				re=[]
				sub=[]
				set=false
				d=0
				for i in self.str.values
					if i=="[" or i=="]" then continue
					if set==false and i!="'" then continue
					if i == "'" then
						set=true
						d=d+1
						if d==2 then set=false
					end if
					if set==true then
						if i != "'" then sub.push(i)
						continue
					end if
					if set==false then
						re.push(sub.join(""))
						sub=[]
						d=0
					end if
				end for
				return re
			end if

			if self.multiInstance==false then
				li=self.str[1:-1].split(", ")
				re=[]
				for i in li
					re.push(i[1:-1])
				end for
				return re
			end if
		end if
	end function
	self.groups=self.content.split("\n")
	//print(self.groups)
	self.List=[]
	for line in self.groups
		if line=="{" or line=="}" then continue
		if line.values.indexOf("}") != null then continue
		elev=slice(line.values, 0, line.values.indexOf("'")).len
		pair=line.split(": ")
		if pair[1].values[-1]=="," then self.endIsComma=true else self.endIsComma=false
		//print(pair)
		self.key=slice(pair[0].values, pair[0].values.indexOf("'")+1, pair[0].values.indexOf(":")-1).join("")[:-1]
		self.val=pair[1].to_int
		if self.endIsComma==true then self.val=self.val[:-1]
		if self.val[0]=="[" then
			self.val=toList(self.val)
			self.List.push([elev, self.key, self.val])
			continue
		end if
		if self.val[0]=="'" then
			self.val=self.val[1:-1]
			self.List.push([elev, self.key, self.val])
			continue
		end if
		if self.val[0]=="{" then
			self.val={}
			self.List.push([elev, self.key, self.val])
		end if
		self.List.push([elev, self.key, self.val])
	end for

	m={}
	self.lister=[]
	for info in self.List
		elev=info[0]
		key=info[1]
		value=info[2]
		m=self.trans([elev, key, value], m, self.lister)
	end for
	//go back and make sure that elev is returned in self.trans along with the original return data
	//print(m)
	return m
end function


library.format.write=function(file=false, inputprompt=false, overwrite=false)
	if [file,overwrite,imputprompt] == [0,0,0] then exit("<color=red>USAGE: from '"+library.format.type+"': read(file, inputprompt='string', overwriteBool=false)")
	if typeof(file) != "file" then return {"status":"error", "msg":"from '"+library.format.type+"': read(file, inputprompt='string', overwriteBool=false): 'file' type is not a file"}
	//if inputprompt==false then inputprompt="<color=white><PROMPT>: "
	if typeof(inputprompt) == "string" then self.doPrompt=true else self.doPrompt=false
	if overwrite != true and overwrite != false then {"status":"error", "msg":"from '"+library.format.type+"': read(file, inputprompt='string', overwriteBool=false): 'overwriteBool' type is not a boolean"}

	self.over=overwrite
	self.file=file
	self.prompt=inputprompt
	self.content=self.file.get_content.split("\n")
	self.stop=false
	if self.doPrompt==false then
		print("<size=11>'[enter]' to exit.")
		self.i=false
		while self.stop==false
			if self.i == false then self.ide=user_input("<color=white>Type a prompt string: ")
			self.input=user_input(self.ide)
			if self.input=="" then self.stop=true
			if self.over==true then self.file.set_content(self.input) else self.file.set_content(self.file.get_content+"\n"+self.input)
		end while
	end if

	if self.doPrompt==true then
		if self.over==true then self.file.set_content(self.prompt) else self.file.set_content(self.file.get_content+"\n"+self.prompt)
	end if
end function

require=function(libraryName)
	if not library.hasIndex(libraryName) or libraryName == "type" then return null
	return library[libraryName]
end function
//{"status":"error", "msg":""}

//MESSAGE:
//The most prominant functions here are 'format.search', 'format.columns', and format.json.read/write:
//d1=format.json.write(map) returns a serialized map in string form
//format.json.read(d1) returns a deserialized map object.
//JSON LIMITATIONS:
//json limitations are that you cannot nest arrays or maps, and you cannot have a string and number type in the same list.
//WRITTEN BY: Mr.Memberr#1353 on DISCORD
