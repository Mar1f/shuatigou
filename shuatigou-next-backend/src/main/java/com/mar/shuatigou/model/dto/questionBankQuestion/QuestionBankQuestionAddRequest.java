package com.mar.shuatigou.model.dto.questionBankQuestion;

import lombok.Data;

import java.io.Serializable;

/**
 * 创建题库题目关联表请求
 *
 */
@Data
public class QuestionBankQuestionAddRequest implements Serializable {

    /**
     * 题库 id
     */
    private Long questionBankId;

    /**
     * 题目 id
     */
    private Long questionId;

    private static final long serialVersionUID = 1L;
}