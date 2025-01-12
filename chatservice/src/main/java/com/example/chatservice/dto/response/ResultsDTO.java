package com.example.chatservice.dto.response;

import com.example.chatservice.enums.ResultStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResultsDTO {

    //    @ApiModelProperty(
//            notes = "Service message",
//            position = 1)
    MessageResponseDTO message;

    //    @ApiModelProperty(
//            notes = "Result of the Response",
//            position = 2)
    ResultStatus resultStatus;

    //    @ApiModelProperty(
//            notes = "Http status of the Response",
//            position = 3)
    HttpStatus httpStatus;

    //    @ApiModelProperty(
//            notes = "Standard http code of the Response",
//            position = 4)
    String httpCode;
}
