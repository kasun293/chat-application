package com.example.chatservice.dto.response;

import com.example.chatservice.enums.ResultStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseListDTO<T> extends ResultsDTO {

    private List<T> payloadDto;
    private int totalPages;
    private long totalElements;
    private boolean last;
    private int size;
    private int number;
    private Sort sort;
    private int numberOfElements;

    public ResponseListDTO(List<T> payloadDto) {
        this.payloadDto = payloadDto;
    }

    public static ResponseListDTO<?> generateResponse(ResponseListDTO<?> response) {
        response.setResultStatus(ResultStatus.SUCCESSFUL);
        response.setHttpStatus(HttpStatus.OK);
        response.setHttpCode(response.getHttpStatus().toString());
        return response;
    }
}
