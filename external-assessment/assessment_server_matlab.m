% TCP server introduced in R2021a
% Requires Instrument Control Toolbox

% TODO: Respond to client

HOST = "localhost";
PORT = 54003;

clear server;
server = tcpserver(HOST, PORT, "ConnectionChangedFcn", @connectionFcn);
configureCallback(server,"byte",7688,@readDataFcn);

function connectionFcn(src,~)
    if src.Connected
       disp("Incoming connection")
    else
       disp("Client has disconnected.")
    end
end

function readDataFcn(src, ~)
    disp("Data was received from the client.")
    txt = read(src,src.BytesAvailableFcnCount,"string");
    % Don't know of a way to read single packets as they come into matlab
    % So need to manually separate them into single blocks
    % This might break if sending the message from UE4 is slightly altered
    msg_ends = strfind(txt,"}]}}") + 3;
    msg_starts = [1 msg_ends(1:length(msg_ends)-1)+1];
    
    for i = 1:length(msg_ends)
        % This is ridiculous, please tell me this isn't the best way
        single_txt = extractBefore(txt, msg_ends(i)+1);
        single_txt = extractAfter(single_txt, msg_starts(i)-1);
        % Sometimes the buffer starts in the middle of a message,
        % this is one more sanity check to avoid JSON error
        if extract(single_txt, 1) == "{"
            if extract(single_txt, strlength(single_txt)) == "}"
                msg = jsondecode(single_txt).simulationMessage;
                fprintf('Operator %s, mapa %s, czas %f, odl. od trasy %f\n', msg.meta.profile, msg.meta.level, msg.frames.time, msg.frames.reference);
            end
        end
    end
end