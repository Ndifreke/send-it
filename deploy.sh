#!/bin/bash
developmentDir=`pwd`;
buildDir='../build';
echo 'Switching to build directory'

promptClone="Did not find a git directory in build do you want to pull
            from server (Y:N)?"

function cloneRepo(){
    cd $developmentDir;
    rm -d -rf ../build
`git clone https://github.com/ndifreke/sendIt.git ../build`;
}

function deploy(){
    git checkout build 
    git commit -a -am. 
    git push origin build
}

checkoutBuild(){
    git checkout build &>/dev/null
}

if [ -d $buildDir ]; then
    cd $buildDir
    $(checkoutBuild)

    if [ $? -eq 0 ]; then
        $(deploy)
    else 
    echo `pwd`
        echo $promptClone
        read response
     if [ "$response" = "Y" ]; then
        $(cloneRepo)
        $(deploy)
        fi
    fi
fi