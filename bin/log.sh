#!/bin/bash                                                                                                                              
./node_modules/lark/node_modules/lark-log/bin/backuplog.sh -D 02 -S 3 -P ./logs/ -F app.log,app.log.wf,app.info.log -T h -B ./log_bak/ -X 1
