package com.dinogroup.web.rest;

import com.dinogroup.TriSilkApp;

import com.dinogroup.domain.SanPham;
import com.dinogroup.repository.SanPhamRepository;
import com.dinogroup.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.dinogroup.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SanPhamResource REST controller.
 *
 * @see SanPhamResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TriSilkApp.class)
public class SanPhamResourceIntTest {

    private static final LocalDate DEFAULT_NGAY_TAO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_NGAY_TAO = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_KHO_RONG = "AAAAAAAAAA";
    private static final String UPDATED_KHO_RONG = "BBBBBBBBBB";

    private static final String DEFAULT_MET = "AAAAAAAAAA";
    private static final String UPDATED_MET = "BBBBBBBBBB";

    private static final String DEFAULT_TRONG_LUONG = "AAAAAAAAAA";
    private static final String UPDATED_TRONG_LUONG = "BBBBBBBBBB";

    private static final String DEFAULT_TEN_SAN_PHAM = "AAAAAAAAAA";
    private static final String UPDATED_TEN_SAN_PHAM = "BBBBBBBBBB";

    private static final String DEFAULT_DON_GIA = "AAAAAAAAAA";
    private static final String UPDATED_DON_GIA = "BBBBBBBBBB";

    private static final String DEFAULT_TONG_TIEN = "AAAAAAAAAA";
    private static final String UPDATED_TONG_TIEN = "BBBBBBBBBB";

    private static final String DEFAULT_MET_CON_LAI = "AAAAAAAAAA";
    private static final String UPDATED_MET_CON_LAI = "BBBBBBBBBB";

    @Autowired
    private SanPhamRepository sanPhamRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSanPhamMockMvc;

    private SanPham sanPham;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SanPhamResource sanPhamResource = new SanPhamResource(sanPhamRepository);
        this.restSanPhamMockMvc = MockMvcBuilders.standaloneSetup(sanPhamResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SanPham createEntity(EntityManager em) {
        SanPham sanPham = new SanPham()
            .ngayTao(DEFAULT_NGAY_TAO)
            .khoRong(DEFAULT_KHO_RONG)
            .met(DEFAULT_MET)
            .trongLuong(DEFAULT_TRONG_LUONG)
            .tenSanPham(DEFAULT_TEN_SAN_PHAM)
            .donGia(DEFAULT_DON_GIA)
            .tongTien(DEFAULT_TONG_TIEN)
            .metConLai(DEFAULT_MET_CON_LAI);
        return sanPham;
    }

    @Before
    public void initTest() {
        sanPham = createEntity(em);
    }

    @Test
    @Transactional
    public void createSanPham() throws Exception {
        int databaseSizeBeforeCreate = sanPhamRepository.findAll().size();

        // Create the SanPham
        restSanPhamMockMvc.perform(post("/api/san-phams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sanPham)))
            .andExpect(status().isCreated());

        // Validate the SanPham in the database
        List<SanPham> sanPhamList = sanPhamRepository.findAll();
        assertThat(sanPhamList).hasSize(databaseSizeBeforeCreate + 1);
        SanPham testSanPham = sanPhamList.get(sanPhamList.size() - 1);
        assertThat(testSanPham.getNgayTao()).isEqualTo(DEFAULT_NGAY_TAO);
        assertThat(testSanPham.getKhoRong()).isEqualTo(DEFAULT_KHO_RONG);
        assertThat(testSanPham.getMet()).isEqualTo(DEFAULT_MET);
        assertThat(testSanPham.getTrongLuong()).isEqualTo(DEFAULT_TRONG_LUONG);
        assertThat(testSanPham.getTenSanPham()).isEqualTo(DEFAULT_TEN_SAN_PHAM);
        assertThat(testSanPham.getDonGia()).isEqualTo(DEFAULT_DON_GIA);
        assertThat(testSanPham.getTongTien()).isEqualTo(DEFAULT_TONG_TIEN);
        assertThat(testSanPham.getMetConLai()).isEqualTo(DEFAULT_MET_CON_LAI);
    }

    @Test
    @Transactional
    public void createSanPhamWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sanPhamRepository.findAll().size();

        // Create the SanPham with an existing ID
        sanPham.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSanPhamMockMvc.perform(post("/api/san-phams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sanPham)))
            .andExpect(status().isBadRequest());

        // Validate the SanPham in the database
        List<SanPham> sanPhamList = sanPhamRepository.findAll();
        assertThat(sanPhamList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSanPhams() throws Exception {
        // Initialize the database
        sanPhamRepository.saveAndFlush(sanPham);

        // Get all the sanPhamList
        restSanPhamMockMvc.perform(get("/api/san-phams?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sanPham.getId().intValue())))
            .andExpect(jsonPath("$.[*].ngayTao").value(hasItem(DEFAULT_NGAY_TAO.toString())))
            .andExpect(jsonPath("$.[*].khoRong").value(hasItem(DEFAULT_KHO_RONG.toString())))
            .andExpect(jsonPath("$.[*].met").value(hasItem(DEFAULT_MET.toString())))
            .andExpect(jsonPath("$.[*].trongLuong").value(hasItem(DEFAULT_TRONG_LUONG.toString())))
            .andExpect(jsonPath("$.[*].tenSanPham").value(hasItem(DEFAULT_TEN_SAN_PHAM.toString())))
            .andExpect(jsonPath("$.[*].donGia").value(hasItem(DEFAULT_DON_GIA.toString())))
            .andExpect(jsonPath("$.[*].tongTien").value(hasItem(DEFAULT_TONG_TIEN.toString())))
            .andExpect(jsonPath("$.[*].metConLai").value(hasItem(DEFAULT_MET_CON_LAI.toString())));
    }

    @Test
    @Transactional
    public void getSanPham() throws Exception {
        // Initialize the database
        sanPhamRepository.saveAndFlush(sanPham);

        // Get the sanPham
        restSanPhamMockMvc.perform(get("/api/san-phams/{id}", sanPham.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sanPham.getId().intValue()))
            .andExpect(jsonPath("$.ngayTao").value(DEFAULT_NGAY_TAO.toString()))
            .andExpect(jsonPath("$.khoRong").value(DEFAULT_KHO_RONG.toString()))
            .andExpect(jsonPath("$.met").value(DEFAULT_MET.toString()))
            .andExpect(jsonPath("$.trongLuong").value(DEFAULT_TRONG_LUONG.toString()))
            .andExpect(jsonPath("$.tenSanPham").value(DEFAULT_TEN_SAN_PHAM.toString()))
            .andExpect(jsonPath("$.donGia").value(DEFAULT_DON_GIA.toString()))
            .andExpect(jsonPath("$.tongTien").value(DEFAULT_TONG_TIEN.toString()))
            .andExpect(jsonPath("$.metConLai").value(DEFAULT_MET_CON_LAI.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSanPham() throws Exception {
        // Get the sanPham
        restSanPhamMockMvc.perform(get("/api/san-phams/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSanPham() throws Exception {
        // Initialize the database
        sanPhamRepository.saveAndFlush(sanPham);
        int databaseSizeBeforeUpdate = sanPhamRepository.findAll().size();

        // Update the sanPham
        SanPham updatedSanPham = sanPhamRepository.findOne(sanPham.getId());
        // Disconnect from session so that the updates on updatedSanPham are not directly saved in db
        em.detach(updatedSanPham);
        updatedSanPham
            .ngayTao(UPDATED_NGAY_TAO)
            .khoRong(UPDATED_KHO_RONG)
            .met(UPDATED_MET)
            .trongLuong(UPDATED_TRONG_LUONG)
            .tenSanPham(UPDATED_TEN_SAN_PHAM)
            .donGia(UPDATED_DON_GIA)
            .tongTien(UPDATED_TONG_TIEN)
            .metConLai(UPDATED_MET_CON_LAI);

        restSanPhamMockMvc.perform(put("/api/san-phams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSanPham)))
            .andExpect(status().isOk());

        // Validate the SanPham in the database
        List<SanPham> sanPhamList = sanPhamRepository.findAll();
        assertThat(sanPhamList).hasSize(databaseSizeBeforeUpdate);
        SanPham testSanPham = sanPhamList.get(sanPhamList.size() - 1);
        assertThat(testSanPham.getNgayTao()).isEqualTo(UPDATED_NGAY_TAO);
        assertThat(testSanPham.getKhoRong()).isEqualTo(UPDATED_KHO_RONG);
        assertThat(testSanPham.getMet()).isEqualTo(UPDATED_MET);
        assertThat(testSanPham.getTrongLuong()).isEqualTo(UPDATED_TRONG_LUONG);
        assertThat(testSanPham.getTenSanPham()).isEqualTo(UPDATED_TEN_SAN_PHAM);
        assertThat(testSanPham.getDonGia()).isEqualTo(UPDATED_DON_GIA);
        assertThat(testSanPham.getTongTien()).isEqualTo(UPDATED_TONG_TIEN);
        assertThat(testSanPham.getMetConLai()).isEqualTo(UPDATED_MET_CON_LAI);
    }

    @Test
    @Transactional
    public void updateNonExistingSanPham() throws Exception {
        int databaseSizeBeforeUpdate = sanPhamRepository.findAll().size();

        // Create the SanPham

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSanPhamMockMvc.perform(put("/api/san-phams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sanPham)))
            .andExpect(status().isCreated());

        // Validate the SanPham in the database
        List<SanPham> sanPhamList = sanPhamRepository.findAll();
        assertThat(sanPhamList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSanPham() throws Exception {
        // Initialize the database
        sanPhamRepository.saveAndFlush(sanPham);
        int databaseSizeBeforeDelete = sanPhamRepository.findAll().size();

        // Get the sanPham
        restSanPhamMockMvc.perform(delete("/api/san-phams/{id}", sanPham.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SanPham> sanPhamList = sanPhamRepository.findAll();
        assertThat(sanPhamList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SanPham.class);
        SanPham sanPham1 = new SanPham();
        sanPham1.setId(1L);
        SanPham sanPham2 = new SanPham();
        sanPham2.setId(sanPham1.getId());
        assertThat(sanPham1).isEqualTo(sanPham2);
        sanPham2.setId(2L);
        assertThat(sanPham1).isNotEqualTo(sanPham2);
        sanPham1.setId(null);
        assertThat(sanPham1).isNotEqualTo(sanPham2);
    }
}
