package com.ssafy.sval.responseType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoolResult {
    private String name;
    private boolean value;
    private String state;
}
