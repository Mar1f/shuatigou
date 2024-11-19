package com.mar.shuatigou.model.dto.question;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * @description；
 * @author:mar1
 * @data:2024/11/19
 **/
@Data
public class QuestionBatchDeleteRequest implements Serializable {

    /**
     * 题目 id 列表
     */
    private List<Long> questionIdList;

    private static final long serialVersionUID = 1L;
}
